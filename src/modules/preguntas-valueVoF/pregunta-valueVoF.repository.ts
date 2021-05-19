import { EntityRepository, Repository } from "typeorm";
import {PreguntaValueVoF} from "./pregunta-valueVoF.entity";
@EntityRepository(PreguntaValueVoF)  
export class PreguntaValueVoFRepository extends Repository<PreguntaValueVoF>{}