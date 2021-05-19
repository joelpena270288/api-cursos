import { EntityRepository, Repository } from 'typeorm';
import { PreguntaChecked } from './pregunta-checked.entity';
@EntityRepository(PreguntaChecked)
export class PreguntaCheckedRepository extends Repository<PreguntaChecked> {}
