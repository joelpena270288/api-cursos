import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PreguntaValueVoFRepository } from './pregunta-valueVoF.repository';
import { PreguntaValueVoF } from './pregunta-valueVoF.entity';
import { PreguntaVfRepository } from '../pregunta-vf/pregunta-vf.repository';
import { PreguntaModuloRepository } from '../pregunta-modulo/pregunta-modulo.repository';
import { PreguntaMultiselected } from '../pregunta-multiselected/pregunta-multiselected.entity';
import { PreguntaMultiselectedRepository } from '../pregunta-multiselected/pregunta-multiselected.repository';
import { User } from '../user/user.entity';
import { ModuloRepository } from '../modulo/modulo.repository';

@Injectable()
export class PreguntaValueService {
  constructor(
    private readonly _preguntaValueVoFRepository: PreguntaValueVoFRepository,
    private readonly _preguntaVFRepository: PreguntaVfRepository,
    private readonly _preguntaModuloRepository: PreguntaModuloRepository,
    private readonly _moduloRepository: ModuloRepository,
    private readonly _preguntaMultiselectedRepository: PreguntaMultiselectedRepository,
  ) {}

  async create(
    idpreguntVoF: string,
    preguntaValueVoF: PreguntaValueVoF,
    user: User,
  ): Promise<PreguntaValueVoF> {
    const foundmodulo = await this._moduloRepository
      .createQueryBuilder('modulo')
      .innerJoin('modulo.examen', 'examen')
      .innerJoin('examen.preguntasModulo', 'preguntasModulo')
      .leftJoinAndSelect('preguntasModulo.preguntaVoF', 'preguntaVoF')

      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('preguntaVoF.id = :id', { id: idpreguntVoF })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();
    if (!foundmodulo) {
      throw new NotFoundException('You dont have permission for this Question');
    }
    let savedPreguntaValueVoF;
    const foundpreguntaMod = await this._preguntaVFRepository.findOne({
      where: { id: idpreguntVoF },
    });
    preguntaValueVoF.preguntavf = foundpreguntaMod;
    try {
      savedPreguntaValueVoF = await this._preguntaValueVoFRepository.save(
        preguntaValueVoF,
      );
    } catch (e) {
      throw new NotFoundException('You dont have permission for this Question');
    }
    if (!savedPreguntaValueVoF) {
      throw new NotFoundException('Dont save Question');
    }
    return savedPreguntaValueVoF;
  }
  async createMultiselected(
    idpreguntMulti: string,
    preguntaValueVoF: PreguntaValueVoF,
    user: User,
  ): Promise<PreguntaValueVoF> {
    const modulo = await this._moduloRepository
      .createQueryBuilder('modulo')
      .innerJoin('modulo.examen', 'examen')
      .innerJoin('examen.preguntasModulo', 'preguntasModulo')
      .leftJoinAndSelect(
        'preguntasModulo.preguntamultiselected',
        'preguntamultiselected',
      )

      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('preguntamultiselected.id = :id', { id: idpreguntMulti })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();
    if (!modulo) {
      throw new NotFoundException('You dont have permission for this Question');
    }
    let savedPreguntaValueVoF;
    const foundPreguntaMulti = await this._preguntaMultiselectedRepository.findOne(
      { where: { id: idpreguntMulti } },
    );
    preguntaValueVoF.preguntaMultiselected = foundPreguntaMulti;
    try {
      savedPreguntaValueVoF = await this._preguntaValueVoFRepository.save(
        preguntaValueVoF,
      );
    } catch (e) {
      throw new NotFoundException('Error internal');
    }
    if (!savedPreguntaValueVoF) {
      throw new NotFoundException('Dont save Question');
    }
    return savedPreguntaValueVoF;
  }
}
