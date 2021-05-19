import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadExtraclaseRepository } from './actividadextraclase.repository';
import { ActividadesExtraclase } from './actividadextraclase.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ActividadExtraclaseService {
  constructor(
    @InjectRepository(ActividadExtraclaseRepository)
    private readonly _actividadextraclaseRepository: ActividadExtraclaseRepository,
  ) {}

  async create(
    actvidadextraclase: ActividadesExtraclase,
  ): Promise<ActividadesExtraclase> {
    const savedActvidadEstraclase: ActividadesExtraclase = await this._actividadextraclaseRepository.save(
      actvidadextraclase,
    );
    return savedActvidadEstraclase;
  }
  async getAllByIdClase(actividadid: string): Promise<ActividadesExtraclase[]> {
    const actvidadextraclase: ActividadesExtraclase[] = await this._actividadextraclaseRepository.find(
      {
        where: { actividad: actividadid },
      },
    );
    return actvidadextraclase;
  }
  async update(
    idactividad: string,
    actividad: ActividadesExtraclase,
    user: User,
  ): Promise<boolean> {
    const actividadfound = await this._actividadextraclaseRepository
      .createQueryBuilder('actividadextra')
      .innerJoin('actividadextra.actividad', 'actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('actividadextra.id = :idactividad', { idactividad: idactividad })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();
    if (!actividadfound) {
      throw new NotFoundException('this Activity does not found');
    }
    actividadfound.orientacion = actividad.orientacion;
    actividadfound.documentos = actividad.documentos;
    actividadfound.fecha_entrega = actividad.fecha_entrega;
    actividadfound.punto = actividad.punto;
    actividadfound.updatedAt = new Date();

    let savedactividad;
    try {
      savedactividad = await this._actividadextraclaseRepository.save(
        actividadfound,
      );
    } catch (e) {
      console.log(e);
    }
    if (!savedactividad) {
      throw new NotFoundException('Dont was saved this homework');
    }
    return true;
  }
  async delete(homeworkid: string, user: User): Promise<boolean> {
    const homeworkFound = await this._actividadextraclaseRepository
      .createQueryBuilder('actividadextra')
      .innerJoin('actividadextra.actividad', 'actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('actividadextra.id = :homeworkid', { homeworkid: homeworkid })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();

    if (!homeworkFound) {
      throw new NotFoundException('Homework does not exist');
    }
    await this._actividadextraclaseRepository.delete(homeworkFound);
    return true;
  }
}
