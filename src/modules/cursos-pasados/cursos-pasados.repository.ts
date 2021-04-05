import { EntityRepository, Repository } from "typeorm";
import { CursosPasados } from "./cursos-pasados.entity";
@EntityRepository(CursosPasados)  
export class CursosPasadosRepository extends Repository<CursosPasados>{

}