import { EntityRepository, Repository } from "typeorm";
import { PlanEstudio } from "./plan-estudio.entity";
@EntityRepository(PlanEstudio)  
export class PlanEstudioRepository extends Repository<PlanEstudio>{

}