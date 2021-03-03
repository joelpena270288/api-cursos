import { EntityRepository, Repository } from "typeorm";
import { Documento } from "./documento.entity";
@EntityRepository(Documento)  
export class DocumentoRepository extends Repository<Documento>{

}
