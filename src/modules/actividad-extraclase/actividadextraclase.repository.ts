import { EntityRepository, Repository } from "typeorm";
import { ActividadesExtraclase } from "./actividadextraclase.entity";
@EntityRepository(ActividadesExtraclase)  
export class ActividadExtraclaseRepository extends Repository<ActividadesExtraclase>{

}