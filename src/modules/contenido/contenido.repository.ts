import { EntityRepository, Repository } from "typeorm";
import { Contenido } from "./contenido.entity";
@EntityRepository(Contenido)  
export class ContenidoRepository extends Repository<Contenido>{

}