import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../user/user.entity';
import { PreguntaRepository } from './pregunta.repository';
import { Pregunta } from './pregunta.entity';
import { PreguntaModuloRepository } from '../pregunta-modulo/pregunta-modulo.repository';
import { ModuloRepository } from '../modulo/modulo.repository';

@Injectable()
export class PreguntaService {
  constructor(
    private readonly _preguntaRepository: PreguntaRepository,
    private readonly _preguntaModuloRepository: PreguntaModuloRepository,
    private readonly _moduloRepository: ModuloRepository,
  ) {}
  async create(
    idpregunta: string,
    pregunta: Pregunta,
    user: User,
  ): Promise<Pregunta> {
    let foundpreguntamodulo;
    try {
      foundpreguntamodulo = await this._preguntaModuloRepository
        .createQueryBuilder('pregunta')
        .innerJoin('pregunta.examenModulo', 'examenModulo')
        .leftJoinAndSelect('pregunta.preguntachecked', 'preguntachecked')

        .where('preguntachecked.id = :id', { id: idpregunta })

        .getOne();
    } catch (e) {
      throw new NotFoundException('Error in the consult');
    }
    let permiso;
    try {
      permiso = await this._moduloRepository
        .createQueryBuilder('modulo')
        .innerJoin('modulo.examen', 'examen')
        .innerJoin('modulo.curso', 'curso')
        .innerJoin('curso.dashboard', 'dashboard')
        .innerJoin('examen.preguntasModulo', 'preguntasModulo')
        .innerJoin('preguntasModulo.preguntachecked', 'preguntachecked')
        .where('preguntachecked.id = :id', { id: idpregunta })
        .andWhere('dashboard.user = :user', { user: user.id });
    } catch (e) {
      throw new NotFoundException('Error in the consult');
    }
    if (!permiso) {
      throw new NotFoundException('You dont have permission for this Question');
    }

    let savedPregunta;
    pregunta.preguntaChecked = foundpreguntamodulo.preguntachecked;
    try {
      savedPregunta = await this._preguntaRepository.save(pregunta);
    } catch (e) {
      throw new NotFoundException('You dont have permission for this Question');
    }
    if (!savedPregunta) {
      throw new NotFoundException('Dont save Question');
    }
    return savedPregunta;
  }
  async getAllByIdPreguntaChecked(
    idpregunta: string,
    user: User,
  ): Promise<Pregunta> {
    let foundpreguntamodulo;
    try {
      foundpreguntamodulo = await this._preguntaModuloRepository
        .createQueryBuilder('pregunta')       
        .leftJoinAndSelect('pregunta.preguntachecked', 'preguntachecked')
        .leftJoinAndSelect('preguntachecked.preguntas', 'preguntas')
       
        .where('preguntachecked.id = :id', { id: idpregunta })
       
        .getOne();
    } catch (e) {
      throw new NotFoundException('Error internal server');
    }
    let permiso;
    try {
      permiso = await this._moduloRepository
        .createQueryBuilder('modulo')
        .innerJoin('modulo.examen', 'examen')
        .innerJoin('modulo.curso', 'curso')
        .innerJoin('curso.dashboard', 'dashboard')
        .innerJoin('examen.preguntasModulo', 'preguntasModulo')
        .innerJoin('preguntasModulo.preguntachecked', 'preguntachecked')
        .where('preguntachecked.id = :id', { id: idpregunta })
        .andWhere('dashboard.user = :user', { user: user.id });
    } catch (e) {
      throw new NotFoundException('Error in the consult');
    }
    if (!permiso) {
      throw new NotFoundException('You dont have permission for this Question');
    }

    return foundpreguntamodulo.preguntachecked.preguntas;
  }
}
