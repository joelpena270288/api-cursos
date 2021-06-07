import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { status } from '../../shared/entity-status.enum';
import { plainToClass } from 'class-transformer';
import { ModuloRepository } from '../modulo/modulo.repository';
import { User } from '../user/user.entity';
import { ExamenModulo } from './examen-modulo.entity';
import { ExamenModuloRepository } from './examen-modulo.repository';
import { ExmanenModuloInDto } from './dto/examen-modulo-in.dto';
import { PreguntaCheckedRepository } from '../pregunta-cheked/pregunta-checked.repository';
import { PreguntaMultiselectedRepository } from '../pregunta-multiselected/pregunta-multiselected.repository';
import { PreguntaVfRepository } from '../pregunta-vf/pregunta-vf.repository';
import { PreguntaModuloRepository } from '../pregunta-modulo/pregunta-modulo.repository';
import { PreguntaValueVoFRepository } from '../preguntas-valueVoF/pregunta-valueVoF.repository';
import { PreguntaValueVoF } from '../preguntas-valueVoF/pregunta-valueVoF.entity';
@Injectable()
export class ExamenModuloService {
  constructor(
    private readonly _examenModuloRepository: ExamenModuloRepository,
    private readonly _moduloRepository: ModuloRepository,
    private readonly _preguntaCheckedRepository: PreguntaCheckedRepository,
    private readonly _preguntaMultiselectedRepository: PreguntaMultiselectedRepository,
    private readonly _preguntaVoFRepository: PreguntaVfRepository,
    private readonly _preguntaModuloRepository: PreguntaModuloRepository,
    private readonly _preguntaValueVoFRepository: PreguntaValueVoFRepository,
  ) {}
  async getExamen(idmodulo: string, user: User): Promise<ExamenModulo> {
    const modulo = await this._moduloRepository
      .createQueryBuilder('modulo')
      .leftJoinAndSelect('modulo.examen', 'examen')
      .leftJoinAndSelect('examen.preguntasModulo', 'preguntasModulo')
      .addOrderBy('preguntasModulo.numeropregunta')
      .leftJoinAndSelect('preguntasModulo.preguntachecked', 'preguntachecked')
      .leftJoinAndSelect('preguntachecked.preguntas', 'preguntas')
      .leftJoinAndSelect(
        'preguntachecked.pregunta_correcta',
        'pregunta_correcta',
      )
      .leftJoinAndSelect('preguntasModulo.preguntacomplete', 'preguntacomplete')
      .leftJoinAndSelect(
        'preguntasModulo.preguntamultiselected',
        'preguntamultiselected',
      )
      .leftJoinAndSelect('preguntasModulo.preguntaVoF', 'preguntaVoF')
      .leftJoinAndSelect('preguntaVoF.preguntasValue', 'preguntasValue')
      .leftJoinAndSelect(
        'preguntamultiselected.preguntasvaluesVoF',
        'preguntasvaluesVoF',
      )

      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')

      .where('modulo.id = :idmodulo', { idmodulo: idmodulo })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();
    if (!modulo) {
      throw new NotFoundException('this Module does not have examen');
    }
    return modulo.examen;
  }
  async evaluarExamen(examen: ExmanenModuloInDto, user: User): Promise<number> {
    let result = 0;

    for (let i = 0; i < examen.allpreguntaChecked.length; i++) {
      if (
        await this.validarChecked(examen.id, examen.allpreguntaChecked[i].id)
      ) {
        const foundpreguntachecked = await this._preguntaCheckedRepository
          .createQueryBuilder('checked')
          .leftJoinAndSelect('checked.pregunta_correcta', 'pregunta_correcta')
          .where('checked.id = :id', { id: examen.allpreguntaChecked[i].id })
          .getOne();
        if (
          foundpreguntachecked.pregunta_correcta.id ===
          examen.allpreguntaChecked[i].respuesta
        ) {
          result += foundpreguntachecked.puntos;
        }
      }
    }
    for (let i = 0; i < examen.allrespuestaMultiselected.length; i++) {
      let cantidadpreguntas = 0;
      let valor = 0;
      if (
        await this.validarMulti(
          examen.id,
          examen.allrespuestaMultiselected[i].id,
        )
      ) {
        const foundpreguntaMulti = await this._preguntaMultiselectedRepository
          .createQueryBuilder('pregunta')
          .where('preguntavalue.id = :id', {
            id: examen.allrespuestaMultiselected[i].id,
          })

          .getOne();
        if (foundpreguntaMulti) {
          valor = foundpreguntaMulti.puntos;
        }

        for (
          let j = 0;
          j < examen.allrespuestaMultiselected[i].respuesta.length;
          j++
        ) {
          if (
            await this.validarToFValueMulti(
              examen.id,
              examen.allrespuestaMultiselected[i].respuesta[j],
            )
          ) {
            const foundpreguntavalue = await this._preguntaValueVoFRepository
              .createQueryBuilder('preguntavalue')
              .where('preguntavalue.id = :id', {
                id: examen.allrespuestaMultiselected[i].respuesta[j],
              })
              .andWhere('preguntavalue.respuesta = :respuesta', {
                respuesta: true,
              })
              .getOne();
            if (foundpreguntavalue) {
              cantidadpreguntas += 1;
            }
          }
        }
      }
      const toda = await this.cantidadPreguntasV(
        examen.allrespuestaMultiselected[i].id,
      );
      if (toda > 0) {
        result += (cantidadpreguntas/toda ) * valor;
      }
    }
    for (let i = 0; i < examen.allrespuestasVoF.length; i++) {
      if (await this.validarToF(examen.id, examen.allrespuestasVoF[i].id)) {
        for (let j = 0; j < examen.allrespuestasVoF[i].respuesta.length; j++) {
          if (
            await this.validarToFValueVoF(
              examen.id,
              examen.allrespuestasVoF[i].respuesta[j].id,
            )
          ) {
            const foundpreguntavalue = await this._preguntaValueVoFRepository
              .createQueryBuilder('preguntavalue')
              .where('preguntavalue.id = :id', {
                id: examen.allrespuestasVoF[i].respuesta[j].id,
              })
              .getOne();

            if (
              foundpreguntavalue.respuesta &&
              examen.allrespuestasVoF[i].respuesta[j].respuesta === 'T'
            ) {
              result += foundpreguntavalue.puntos;
            }
          }
        }
      }
    }

    return result;
  }
  async validarChecked(idexamen: string, idpregunta: string): Promise<boolean> {
    const preguntafound = await this._examenModuloRepository
      .createQueryBuilder('examen')
      .innerJoin('examen.preguntasModulo', 'preguntasModulo')
      .innerJoin('preguntasModulo.preguntachecked', 'preguntachecked')
      .where('examen.id = :idexamen', { idexamen: idexamen })
      .andWhere('preguntachecked.id = :idpregunta', { idpregunta: idpregunta })
      .getOne();
    if (!preguntafound) {
      return false;
    }
    return true;
  }
  async validarMulti(
    idmultiselected: string,
    idpregunta: string,
  ): Promise<boolean> {
    const preguntafound = await this._examenModuloRepository
      .createQueryBuilder('examen')
      .innerJoin('examen.preguntasModulo', 'preguntasModulo')
      .innerJoin(
        'preguntasModulo.preguntamultiselected',
        'preguntamultiselected',
      )
      .where('preguntamultiselected.id = :idmultiselected', {
        idmultiselected: idmultiselected,
      })
      .andWhere('preguntamultiselected.id = :idpregunta', {
        idpregunta: idpregunta,
      })
      .getOne();
    if (!preguntafound) {
      return false;
    }
    return true;
  }
  async validarToF(idexamen: string, idpregunta: string): Promise<boolean> {
    const preguntafound = await this._examenModuloRepository
      .createQueryBuilder('examen')
      .innerJoin('examen.preguntasModulo', 'preguntasModulo')
      .innerJoin('preguntasModulo.preguntaVoF', 'preguntaVoF')
      .where('examen.id = :idexamen', { idexamen: idexamen })
      .andWhere('preguntaVoF.id = :idpregunta', { idpregunta: idpregunta })
      .getOne();
    if (!preguntafound) {
      return false;
    }
    return true;
  }

  async validarToFValueMulti(
    idexamen: string,
    idpregunta: string,
  ): Promise<boolean> {
    const preguntafound = await this._examenModuloRepository
      .createQueryBuilder('examen')
      .innerJoin('examen.preguntasModulo', 'preguntasModulo')
      .innerJoin(
        'preguntasModulo.preguntamultiselected',
        'preguntamultiselected',
      )
      .innerJoin(
        'preguntamultiselected.preguntasvaluesVoF',
        'preguntasvaluesVoF',
      )
      .where('examen.id = :idexamen', { idexamen: idexamen })
      .andWhere('preguntasvaluesVoF.id = :idpregunta', {
        idpregunta: idpregunta,
      })
      .getOne();
    if (!preguntafound) {
      return false;
    }
    return true;
  }

  async validarToFValueVoF(
    idexamen: string,
    idpregunta: string,
  ): Promise<boolean> {
    const preguntafound = await this._examenModuloRepository
      .createQueryBuilder('examen')
      .innerJoin('examen.preguntasModulo', 'preguntasModulo')
      .innerJoin('preguntasModulo.preguntaVoF', 'preguntaVoF')
      .innerJoin('preguntaVoF.preguntasvaluesVoF', 'preguntasvaluesVoF')
      .where('examen.id = :idexamen', { idexamen: idexamen })
      .andWhere('preguntasvaluesVoF.id = :idpregunta', {
        idpregunta: idpregunta,
      })
      .getOne();
    if (!preguntafound) {
      return false;
    }
    return true;
  }
  async cantidadPreguntasV(idmultiselected: string): Promise<number> {
    const countpregunta = await this._preguntaValueVoFRepository
      .createQueryBuilder('pregunta')
      .innerJoin('pregunta.preguntaMultiselected', 'preguntaMultiselected')

      .where('preguntamultiselected.id = :idmultiselected', {
        idmultiselected: idmultiselected,
      })
      .andWhere('pregunta.respuesta = :respuesta', {
        respuesta: true,
      })
      .getCount();

    return countpregunta;
  }
}
