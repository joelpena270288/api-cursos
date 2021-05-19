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
import { User } from '../user/user.entity';
@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(ClaseRepository)
    private readonly _claseRepository: ClaseRepository,
    @InjectRepository(ModuloRepository)
    private readonly _moduloRepository: ModuloRepository,
  ) {}
  async create(clase: Clase, user: User): Promise<Clase> {
    if (clase.id != '') {
      let foundclase;
      try {
        foundclase = await this._claseRepository
          .createQueryBuilder('clase')
          .innerJoin('clase.modulo', 'modulo')
          .innerJoin('modulo.curso', 'curso')
          .innerJoin('curso.dashboard', 'dashboard')
          .where('clase.id = :idclase', { idclase: clase.id })
          .andWhere('dashboard.user = :user', { user: user.id })
          .getOne();
      } catch (e) {
        console.log(e);
      }
      if (foundclase) {
        foundclase.nombre = clase.nombre;
        foundclase.descripcion = clase.descripcion;
        foundclase.nota = clase.nota;
        foundclase.numeroclase = clase.numeroclase;
        foundclase.fecha_inicio = clase.fecha_inicio;
        foundclase.updatedAt = new Date();
        foundclase.modulo = clase.modulo;
        const savedclass = await this._claseRepository.save(foundclase);
        if (!savedclass) {
          throw new NotFoundException('Error dont update lesson');
        }
      }
    } else {
      let modulo;
      try {
        modulo = await this._moduloRepository
          .createQueryBuilder('modulo')

          .innerJoin('modulo.curso', 'curso')
          .innerJoin('curso.dashboard', 'dashboard')
          .where('modulo.id = :idmodule', { idmodule: clase.modulo })
          .andWhere('dashboard.user = :user', { user: user.id })

          .getOne();
      } catch (e) {
        throw new NotFoundException('Error in ');
      }

      if (!modulo) {
        throw new NotFoundException('you dont have this module');
      }
      const nuevaclase = new Clase();
      nuevaclase.nombre = clase.nombre;
      nuevaclase.descripcion = clase.descripcion;
      nuevaclase.nota = clase.nota;
      nuevaclase.numeroclase = clase.numeroclase;
      nuevaclase.fecha_inicio = clase.fecha_inicio;
     
      nuevaclase.modulo = clase.modulo;
      
      const savedClase: Clase = await this._claseRepository.save(nuevaclase);
    }
    return clase;
  }
  async get(claseid: string, user: User): Promise<Clase> {
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
  async getAll(): Promise<any> {
    return await this._claseRepository.find({ relations: ['actividades'] });
  }

  async update(
    claseid: string,
    clasecompleta: Clase,
    user: User,
  ): Promise<Clase> {
    let clase;
    try {
      clase = await this._claseRepository
        .createQueryBuilder('clase')
        .innerJoin('clase.modulo', 'modulo')
        .innerJoin('modulo.curso', 'curso')
        .innerJoin('curso.dashboard', 'dashboard')
        .where('clase.id = :claseid', { claseid: claseid })
        .andWhere('dashboard.user = :user', { user: user.id })
        .addOrderBy('clase.numeroclase')
        .getOne();
    } catch (e) {
      throw new NotFoundException('Error in ');
    }
    if (!clase) {
      throw new NotFoundException('this lesson does not found');
    }

    return clase;
  }
  async delete(claseId: string, user: User): Promise<boolean> {
    const claseFound = await this._claseRepository
      .createQueryBuilder('clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('clase.id = :claseid', { claseid: claseId })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();

    if (!claseFound) {
      throw new NotFoundException('Clase does not exist');
    }
    await this._claseRepository.delete(claseFound);
    return true;
  }
  async getAllByIdModulo(moduloid: string, user: User): Promise<Clase[]> {
    const clase: Clase[] = await this._claseRepository
      .createQueryBuilder('clase')
      .addOrderBy('clase.numeroclase')
      .leftJoinAndSelect('clase.actividades', 'actividades')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('modulo.id = :id', { id: moduloid })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getMany();
    return clase;
  }
}
