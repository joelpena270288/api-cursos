import { EntityRepository, Repository } from 'typeorm';
import {PreguntaMultiselected} from './pregunta-multiselected.entity';
@EntityRepository(PreguntaMultiselected)
export class PreguntaMultiselectedRepository extends Repository<PreguntaMultiselected>{}