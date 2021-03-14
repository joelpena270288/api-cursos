import { EntityRepository, Repository } from 'typeorm';
import { Actividad } from './actividad.entity';
@EntityRepository(Actividad)
export class ActividadRepository extends Repository<Actividad> {}
