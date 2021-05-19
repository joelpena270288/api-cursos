import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PreguntaCheckedRepository } from './pregunta-checked.repository';
import { PreguntaChecked } from './pregunta-checked.entity';
import { User } from '../user/user.entity';
import { PreguntaModuloRepository } from '../pregunta-modulo/pregunta-modulo.repository';
import { AddpreguntaCheckedDto } from './dto/addpreguntaChecked.dto';
import { ModuloRepository } from '../modulo/modulo.repository';

@Injectable()
export class PreguntaCheckedService {
  constructor(
    private readonly _preguntaCheckedRepository: PreguntaCheckedRepository,
    private readonly _preguntaModuloRepository: PreguntaModuloRepository,
    private readonly _moduloRepository: ModuloRepository,
  ) {}
  async create(
    pregunta: AddpreguntaCheckedDto,
    user: User,
  ): Promise<PreguntaChecked> {
    let preguntaMod;
    try {
      preguntaMod = await this._preguntaModuloRepository
        .createQueryBuilder('pregunta')
        .where('pregunta.id = :id', { id: pregunta.idpregunta })

        .getOne();
    } catch (e) {
      throw new NotFoundException('Not found the question');
    }

    const permiso = await this._moduloRepository
      .createQueryBuilder('modulo')
      .innerJoin('modulo.examen', 'examen')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .innerJoin('examen.preguntasModulo', 'preguntasModulo')
      .where('preguntasModulo.id = :id', { id: pregunta.idpregunta })
      .andWhere('dashboard.user = :user', { user: user.id });
    if (!permiso) {
      throw new NotFoundException('You dont have permission for this Question');
    }

    if (!preguntaMod) {
      throw new NotFoundException('You dont have permission for this Question');
    }
    const preuguntaChecked = new PreguntaChecked();
    const savedPreguntaChecked = await this._preguntaCheckedRepository.save(
      preuguntaChecked,
    );
    if (!savedPreguntaChecked) {
      throw new NotFoundException('Error al guardar la pregunta');
    }
    preguntaMod.preguntachecked = savedPreguntaChecked;
    await this._preguntaModuloRepository.save(preguntaMod);
    return savedPreguntaChecked;
  }
  async update(
    pregunta: PreguntaChecked,
    user: User,
  ): Promise<PreguntaChecked> {
    let preguntaMod;

    const permiso = await this._moduloRepository
      .createQueryBuilder('modulo')
      .innerJoin('modulo.examen', 'examen')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .innerJoin('examen.preguntasModulo', 'preguntasModulo')
      .innerJoin('preguntasModulo.preguntachecked', 'preguntachecked')

      .where('preguntachecked.id = :id', { id: pregunta.id })
      .andWhere('dashboard.user = :user', { user: user.id });
    if (!permiso) {
      throw new NotFoundException('You dont have permission for this Question');
    }

    try {
      preguntaMod = await this._preguntaModuloRepository
        .createQueryBuilder('pregunta')
        .leftJoinAndSelect('pregunta.preguntachecked', 'preguntachecked')

        .where('preguntachecked.id = :id', { id: pregunta.id })

        .getOne();
    } catch (e) {
      throw new NotFoundException('No existe la pregunta');
    }
    const preguntaChecked = preguntaMod.preguntachecked;
    let preguntasaved;
    preguntaChecked.pregunta_correcta = pregunta.pregunta_correcta;
    try {
      preguntasaved = await this._preguntaCheckedRepository.save(
        preguntaChecked,
      );
    } catch (e) {
      throw new NotFoundException('Error en la consulta');
    }
    return preguntasaved;
  }
}
