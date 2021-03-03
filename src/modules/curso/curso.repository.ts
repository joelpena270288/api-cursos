import { EntityRepository, Repository } from "typeorm";
import { Curso } from "./curso.entity";
@EntityRepository(Curso)  
export class CursoRepository extends Repository<Curso>{

}