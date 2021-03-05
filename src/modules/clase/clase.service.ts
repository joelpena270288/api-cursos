import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClaseRepository } from './clase.repository';
import { ModuloRepository } from '../modulo/modulo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './clase.entity';
import { Modulo } from '../modulo/modulo.entity';
import { status } from '../../shared/entity-status.enum';
@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(ClaseRepository)
    private readonly _claseRepository: ClaseRepository,
    @InjectRepository(ModuloRepository)
    private readonly _moduloRepository: ModuloRepository,
  ) {}
  async create(clase: Clase): Promise<Clase> {
    const savedClase: Clase = await this._claseRepository.save(clase);
    return clase;
  }
  async get(claseid: number): Promise<Clase> {
    if (!claseid) {
      throw new BadRequestException('id must be sent');
    }
    const clase: Clase = await this._claseRepository.findOne(claseid, {
      where: { status: status.ACTIVE },
    });
    if (!clase) {
      throw new NotFoundException('this module does not found');
    }
    return clase;
  }
  async getAll(): Promise<Clase[]> {
    const clase: Clase[] = await this._claseRepository.find({
      where: { status: status.ACTIVE },
    });
    return clase;
  }

  async update(claseid: number, clase: Clase): Promise<Clase> {
    const foundclase = await this._moduloRepository.findOne(claseid, {
      where: { status: 'ACTIVE' },
    });
    if (!foundclase) {
      throw new NotFoundException('clase not exist');
    }
    foundclase.nombre = clase.nombre;
    foundclase.descripcion = clase.descripcion;
    foundclase.status = clase.status;

    const updateclase: Clase = await this._claseRepository.save(foundclase);
    return updateclase;
  }
  async delete(claseId: number): Promise<boolean> {
    const claseExist = await this._claseRepository.findOne(claseId, {
      where: { status: 'ACTIVE' },
    });
    if (!claseExist) {
      throw new NotFoundException('Clase does not exist');
    }
    await this._claseRepository.update(claseId, { status: status.INACTIVE });
    return true;
  }
}
