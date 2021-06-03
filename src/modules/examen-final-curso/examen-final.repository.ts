import { EntityRepository, Repository } from 'typeorm';
import { ExamenFinal } from './examen-final.entity';
@EntityRepository(ExamenFinal)
export class ExamenFinalRepository extends Repository<ExamenFinal> {}