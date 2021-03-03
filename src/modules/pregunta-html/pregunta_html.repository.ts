import { EntityRepository, Repository } from "typeorm";
import { PreguntaHtml } from "./preguntahtml.entity";
@EntityRepository(PreguntaHtml)  
export class PreguntaHtmlRepository extends Repository<PreguntaHtml>{

}