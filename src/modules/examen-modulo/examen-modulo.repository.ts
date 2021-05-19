import { EntityRepository, Repository } from 'typeorm';
import { ExamenModulo } from './examen-modulo.entity';
@EntityRepository(ExamenModulo)
export class ExamenModuloRepository extends Repository<ExamenModulo> {}
