import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User } from '../user/user.entity';
import { PreguntaMultiselectedRepository } from './pregunta-multiselected.repository';
import { PreguntaMultiselected } from './pregunta-multiselected.entity';
import { PreguntaModuloRepository } from '../pregunta-modulo/pregunta-modulo.repository';
import { ModuloRepository } from '../modulo/modulo.repository';
@Injectable()
export class PreguntaMultiselectedService {
  constructor(
    private readonly _preguntaMultiselectedRepository: PreguntaMultiselectedRepository,
    private readonly _preguntaModuloRepository: PreguntaModuloRepository,
    private readonly _moduloRepository: ModuloRepository,
  ) {}
  async create(
    idPreguntaModulo: string,
    user: User,
  ): Promise<PreguntaMultiselected> {
    let preguntaMod;
    try {
      preguntaMod = await this._moduloRepository
        .createQueryBuilder('modulo')
        .innerJoin('modulo.examen', 'examen')
        .innerJoin('examen.preguntasModulo', 'preguntasModulo')
        .innerJoin('modulo.curso', 'curso')
        .innerJoin('curso.dashboard', 'dashboard')
        .where('preguntasModulo.id = :id', { id: idPreguntaModulo })
        .andWhere('dashboard.user = :user', { user: user.id })
        .getOne();
    } catch (e) {
      throw new NotFoundException('Dont exist this question');
    }
    if (!preguntaMod) {
      throw new NotFoundException('You dont have permission for this Question');
    }
    const preuguntaMulti = new PreguntaMultiselected();
    const savedPreguntaMulti = await this._preguntaMultiselectedRepository.save(
      preuguntaMulti,
    );
    if (!savedPreguntaMulti) {
      throw new NotFoundException('Error al guardar la pregunta');
    }
    const foundPregMod = await this._preguntaModuloRepository.findOne({
      where: { id: idPreguntaModulo },
    });
    foundPregMod.preguntamultiselected = savedPreguntaMulti;
    await this._preguntaModuloRepository.save(foundPregMod);
    return savedPreguntaMulti;
  }
}
