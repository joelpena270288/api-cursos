import { EntityRepository, Repository } from "typeorm";
import { Actividades } from "./actividad.entity";
@EntityRepository(Actividades)  
export class ActividadRepository extends Repository<Actividades>{

}