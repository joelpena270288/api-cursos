import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../user/user.entity';
import { PreguntaModuloRepository } from './pregunta-modulo.repository';
import { PreguntaModulo } from './pregunta-modulo.entity';
import { ModuloRepository } from '../modulo/modulo.repository';
import { ExamenModuloRepository } from '../examen-modulo/examen-modulo.repository';
import { ExamenModulo } from '../examen-modulo/examen-modulo.entity';
import { AddPreguntaModulodto } from './dto/addPreguntaModulo.dto';

@Injectable()
export class PreguntaModuloService {
  constructor(
    private readonly _preguntaModuloRepossitory: PreguntaModuloRepository,
    private readonly _moduloRepository: ModuloRepository,
    private readonly _examenModulo: ExamenModuloRepository,
  ) {}
  async create(
    moduloId: string,
    preguntadto: AddPreguntaModulodto,
    user: User,
  ): Promise<PreguntaModulo> {
    const foundModule = await this._moduloRepository
      .createQueryBuilder('modulo')
      .leftJoinAndSelect('modulo.examen', 'examen')
      .leftJoinAndSelect('modulo.curso', 'curso')
      .leftJoinAndSelect('curso.dashboard', 'dashboard')
      .where('modulo.id = :idmodulo', { idmodulo: moduloId })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();
    if (!foundModule) {
      throw new NotFoundException('You dont have permission for this Examen');
    }

    const pregunta = new PreguntaModulo();
    pregunta.examenModulo = foundModule.examen;
    pregunta.numeropregunta = preguntadto.numeropregunta;
    pregunta.varlorPregunta = preguntadto.valorpregunta;
    let savedPregunta = await this._preguntaModuloRepossitory.save(pregunta);
   

   
    return savedPregunta;
  }
  
}
