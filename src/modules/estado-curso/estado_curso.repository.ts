import { EntityRepository, Repository } from "typeorm";
import { EstadoCurso } from "./estado_curso.entity";
@EntityRepository(EstadoCurso)  
export class EstadoCursoRepository extends Repository<EstadoCurso>{

}