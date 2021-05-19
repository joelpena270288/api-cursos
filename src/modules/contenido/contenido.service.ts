import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContenidoRepository } from './contenido.repository';
import { Contenido } from './contenido.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ContenidoService {
  constructor(
    @InjectRepository(ContenidoRepository)
    private readonly _contenidoRepository: ContenidoRepository,
  ) {}

  async create(contenido: Contenido): Promise<Contenido> {
    const savedContenido: Contenido = await this._contenidoRepository.save(
      contenido,
    );
    return savedContenido;
  }
  async getAllByIdClase(actividadid: string): Promise<Contenido[]> {
    const contenido: Contenido[] = await this._contenidoRepository.find({
      where: { actividad: actividadid },
    });
    return contenido;
  }
  async update(
    idcontenido: string,
    contenido: Contenido,
    user: User,
  ): Promise<boolean> {
    const contenidofound = await this._contenidoRepository
      .createQueryBuilder('contenido')
      .innerJoin('contenido.actividad', 'actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('contenido.id = :idcontenido', { idcontenido: idcontenido })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();
    if (!contenidofound) {
      throw new NotFoundException('this Content does not found');
    }
    contenidofound.cuerpo = contenido.cuerpo;

    contenidofound.updatedAt = new Date();
    let savedcontenido;
    try {
      savedcontenido = await this._contenidoRepository.save(contenidofound);
    } catch (e) {
      console.log(e);
    }
    if (!savedcontenido) {
      throw new NotFoundException('Dont was saved content');
    }
    return true;
  }

  async delete(contenidoid: string, user: User): Promise<boolean> {
    const contenidoFound = await this._contenidoRepository
      .createQueryBuilder('contenido')
      .innerJoin('contenido.actividad', 'actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('contenido.id = :contenidoid', { contenidoid: contenidoid })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();

    if (!contenidoFound) {
      throw new NotFoundException('Content does not exist');
    }
    await this._contenidoRepository.delete(contenidoFound);
    return true;
  }
}
