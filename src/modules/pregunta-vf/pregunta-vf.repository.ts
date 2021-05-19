import { EntityRepository, Repository } from 'typeorm';
import { PreguntaVf } from './pregunta-vf.entity';
@EntityRepository(PreguntaVf)
export class PreguntaVfRepository extends Repository<PreguntaVf> {}
