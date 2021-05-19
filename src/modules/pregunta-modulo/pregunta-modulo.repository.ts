import { EntityRepository, Repository } from 'typeorm';
import { PreguntaModulo } from './pregunta-modulo.entity';
@EntityRepository(PreguntaModulo)
export class PreguntaModuloRepository extends Repository<PreguntaModulo> {}
