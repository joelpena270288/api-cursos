import { EntityRepository, Repository } from "typeorm";
import {Clase} from './clase.entity';
@EntityRepository(Clase)  
export class ClaseRepository extends Repository<Clase>{

}