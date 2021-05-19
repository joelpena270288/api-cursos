import { EntityRepository, Repository } from "typeorm";
import { TipoPregunta } from "./tipo-pregunta.entity";
@EntityRepository(TipoPregunta)  
export class TipoPreguntaRepository extends Repository<TipoPregunta>{}