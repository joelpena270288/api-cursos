import { EntityRepository, Repository } from "typeorm";
import { PalabraOrden } from "./palabra-orden.entity";
@EntityRepository(PalabraOrden)  
export class PalabraOrdenRepository extends Repository<PalabraOrden>{}