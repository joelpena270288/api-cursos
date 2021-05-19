import { EntityRepository, Repository } from "typeorm";
import { ModuloActual } from "./modulo-actual.entity";
@EntityRepository(ModuloActual)  
export class ModuloActualRepository extends Repository<ModuloActual>{

}