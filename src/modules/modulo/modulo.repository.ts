import { EntityRepository, Repository } from "typeorm";
import { Modulo } from "./modulo.entity";
@EntityRepository(Modulo)  
export class ModuloRepository extends Repository<Modulo>{

}