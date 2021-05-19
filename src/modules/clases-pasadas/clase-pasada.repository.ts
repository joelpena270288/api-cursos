import { EntityRepository, Repository } from 'typeorm';
import { ClasePasada } from './clases-pasadas.entity';
@EntityRepository(ClasePasada)
export class ClasePasadaRepository extends Repository<ClasePasada> {}
