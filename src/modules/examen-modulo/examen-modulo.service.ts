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

@Injectable()
export class ExamenModuloService {
  constructor(
    private readonly _examenModuloRepository: ExamenModuloRepository,
    private readonly _moduloRepository: ModuloRepository,
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
    return  modulo.examen;
  }
}
