import { EntityRepository, Repository } from 'typeorm';
import { ModulosPasados } from './modulos-pasados.entity';
@EntityRepository(ModulosPasados)
export class ModulosPasadosRepository extends Repository<ModulosPasados> {}
