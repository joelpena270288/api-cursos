import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContenidoRepository } from './contenido.repository';
import { Contenido } from './contenido.entity';

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
  async getAllByIdClase(actividadid: number): Promise<Contenido[]> {
    const video: Contenido[] = await this._contenidoRepository.find({
      where: { actividad: actividadid },
    });
    return video;
  }
}
