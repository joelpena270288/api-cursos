import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadExtraclaseRepository } from './actividadextraclase.repository';
import { ActividadesExtraclase } from './actividadextraclase.entity';

@Injectable()
export class ActividadExtraclaseService {
    constructor(
        @InjectRepository(ActividadExtraclaseRepository)
        private readonly _actividadextraclaseRepository: ActividadExtraclaseRepository,
      ) {}
    
      async create(actvidadextraclase: ActividadesExtraclase): Promise<ActividadesExtraclase> {
        const savedActvidadEstraclase: ActividadesExtraclase = await this._actividadextraclaseRepository.save(
            actvidadextraclase,
        );
        return savedActvidadEstraclase;
      }
      async getAllByIdClase(actividadid: number): Promise<ActividadesExtraclase[]> {
        const actvidadextraclase: ActividadesExtraclase[] = await this._actividadextraclaseRepository.find(
          {
            where: { actividad: actividadid },
          },
        );
        return actvidadextraclase;
      }
}
