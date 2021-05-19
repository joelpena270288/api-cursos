import { EntityRepository, Repository } from 'typeorm';
import { UltimaClase } from './ultima-clase.entity';
@EntityRepository(UltimaClase)
export class UltimaClaseRepository extends Repository<UltimaClase> {}
