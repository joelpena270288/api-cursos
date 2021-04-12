import { EntityRepository, Repository } from "typeorm";
import { CursosProgreso } from "./cursos-progreso.entity";
@EntityRepository(CursosProgreso)  
export class CursosProgresoRepository extends Repository<CursosProgreso>{

}