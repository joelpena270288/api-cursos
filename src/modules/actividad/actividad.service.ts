import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadRepository } from './actividad.repository';
import { ClaseRepository } from '../clase/clase.repository';
import { Actividad } from './actividad.entity';
import { status } from '../../shared/entity-status.enum';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(ActividadRepository)
    private readonly _actividadRepository: ActividadRepository,
    @InjectRepository(ClaseRepository)
    private readonly _claseRepository: ClaseRepository,
  ) {}
  async create(actividad: Actividad): Promise<Actividad> {
    const savedActividad: Actividad = await this._actividadRepository.save(
      actividad,
    );
    return savedActividad;
  }
  async get(actividadid: number): Promise<Actividad> {
    if (!actividadid) {
      throw new BadRequestException('id must be sent');
    }
    const actividad: Actividad = await this._actividadRepository.findOne(
      actividadid,
      {
        where: { status: status.ACTIVE },
      },
    );
    if (!actividad) {
      throw new NotFoundException('this activity does not found');
    }
    return actividad;
  }
  async getAll(): Promise<Actividad[]> {
    const actividad: Actividad[] = await this._actividadRepository.find({
      where: { status: status.ACTIVE },
    });
    return actividad;
  }

  async update(
    actividadid: number,
    actividad: Actividad,
  ): Promise<Actividad> {
    const foundactividad = await this._actividadRepository.findOne(
      actividadid,
      { where: { status: 'ACTIVE' } },
    );
    if (!foundactividad) {
      throw new NotFoundException('activity not exist');
    }
    foundactividad.nombre = actividad.nombre;
    foundactividad.nota = actividad.nota;
    foundactividad.descripcion = actividad.descripcion;

    const updatedactividad: Actividad = await this._actividadRepository.save(
      foundactividad,
    );
    return updatedactividad;
  }
  async delete(actividadId: number): Promise<boolean> {
    const claseExist = await this._actividadRepository.findOne(actividadId, {
      where: { status: 'ACTIVE' },
    });
    if (!claseExist) {
      throw new NotFoundException('Activity does not exist');
    }
    await this._actividadRepository.update(actividadId, {
      status: status.INACTIVE,
    });
    return true;
  }
}
