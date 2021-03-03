import { EntityRepository, Repository } from "typeorm";
import { Evaluacion } from "./evaluacion.entity";
@EntityRepository(Evaluacion)  
export class EvaluacionRepository extends Repository<Evaluacion>{

}