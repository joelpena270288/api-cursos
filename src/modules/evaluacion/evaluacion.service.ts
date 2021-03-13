
import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { EvaluacionRepository } from './evaluacion.repository';
  import { Evaluacion } from './evaluacion.entity';
@Injectable()
export class EvaluacionService {
    constructor(
        @InjectRepository(EvaluacionRepository)
        private readonly _evaluacionRepository: EvaluacionRepository,
      ) {}
      async create(evaluacion: Evaluacion): Promise<Evaluacion> {
        const savedEvaluacion: Evaluacion = await this._evaluacionRepository.save(evaluacion);
        return savedEvaluacion;
      }
      async getAllByIdClase(actividadid: number): Promise<Evaluacion[]> {
        const evaluacion: Evaluacion[] = await this._evaluacionRepository.find({
          where: { actividad: actividadid },
        });
        return evaluacion;
      }
}
