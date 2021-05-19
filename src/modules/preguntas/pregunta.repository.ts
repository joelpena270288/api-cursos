import { EntityRepository, Repository } from "typeorm";
import { Pregunta } from "./pregunta.entity";
@EntityRepository(Pregunta)  
export class PreguntaRepository extends Repository<Pregunta>{

}