import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';
import { plainToClass } from 'class-transformer';
import { ModuloRepository } from './modulo.repository';
import { Modulo } from './modulo.entity';
import { CursoRepository } from '../curso/curso.repository';
import { Curso } from '../curso/curso.entity';
import { User } from '../user/user.entity';
import { ExamenModuloRepository } from '../examen-modulo/examen-modulo.repository';
import { ExamenModulo } from '../examen-modulo/examen-modulo.entity';

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(ModuloRepository)
    private readonly _moduloRepository: ModuloRepository,
    @InjectRepository(CursoRepository)
    private readonly _cursoRepository: CursoRepository,
    @InjectRepository(ExamenModuloRepository)
    private readonly _examenModuloRepository: ExamenModuloRepository,
  ) {}
  async create(modulo: Modulo, user: User): Promise<Modulo> {
    if (modulo.id != '') {
      const foundmodulo = await this._moduloRepository
        .createQueryBuilder('modulo')
        .innerJoin('modulo.curso', 'curso')
        .innerJoin('curso.dashboard', 'dashboard')
        .where('modulo.id = :idmodulo', { idmodulo: modulo.id })
        .andWhere('dashboard.user = :user', { user: user.id })
        .getOne();
      if (foundmodulo) {
        foundmodulo.nombre = modulo.nombre;
        foundmodulo.descripcion = modulo.descripcion;
        foundmodulo.nota = modulo.nota;
        foundmodulo.numeromodulo = modulo.numeromodulo;
        foundmodulo.curso = foundmodulo.curso;
        let savedmodulo;
        try {
          savedmodulo = await this._moduloRepository.save(foundmodulo);
        } catch (e) {
          console.log(e);
        }
        if (!savedmodulo) {
          throw new NotFoundException('Error dont update module');
        }

        return savedmodulo;
      }
    } else {
      const founcurso = await this._cursoRepository
        .createQueryBuilder('curso')
        .innerJoin('curso.dashboard', 'dashboard')
        .where('curso.id = :idcurso', { idcurso: modulo.curso })

        .andWhere('dashboard.user = :user', { user: user.id })
        .getOne();
      if (!founcurso) {
        throw new NotFoundException(
          'you dont have permission to the course ' + modulo.curso,
        );
      }
      const nuevoModulo = new Modulo();
      nuevoModulo.nombre = modulo.nombre;
      nuevoModulo.descripcion = modulo.descripcion;
      nuevoModulo.nota = modulo.nota;
      nuevoModulo.numeromodulo = modulo.numeromodulo;
      nuevoModulo.status = 'ACTIVE';
      nuevoModulo.curso = founcurso;

      const savedModulo = await this._moduloRepository.save(nuevoModulo);
      const nuevoExamen = new ExamenModulo();

      const savedexamen = await this._examenModuloRepository.save(nuevoExamen);
      if (!savedexamen) {
        throw new NotFoundException('Error en la consulta');
      }
      savedModulo.examen = savedexamen;
      const resultado = await this._moduloRepository.save(savedModulo);
      if (!resultado) {
        throw new NotFoundException('Error en la consulta');
      }
    }
    return modulo;
  }
  /*
  async get(moduloid: number): Promise<Modulo> {
    if (!moduloid) {
      throw new BadRequestException('id must be sent');
    }
    const modulo: Modulo = await this._moduloRepository.findOne(moduloid, {
      where: { status: status.ACTIVE },
    });
    if (!modulo) {
      throw new NotFoundException('this module does not found');
    }
    return modulo;
  }
  async getAll(): Promise<Modulo[]> {
    const modulo: Modulo[] = await this._moduloRepository.find({
      where: { status: status.ACTIVE },
    });
    return modulo;
  }*/
  async getAllByIdCurso(cursoid: string, user: User): Promise<Modulo[]> {
    let modulo;
    try {
      modulo = await this._moduloRepository
        .createQueryBuilder('modulo')
        .addOrderBy('modulo.numeromodulo')
        .innerJoin('modulo.curso', 'curso')
        .innerJoin('curso.dashboard', 'dashboard')
        .where('curso.id = :id', { id: cursoid })
        .andWhere('dashboard.user = :user', { user: user.id })
        .getMany();
    } catch (e) {
      console.log(e);
    }
    return modulo;
  }
  /*
  async update(moduloid: number, modulo: Modulo): Promise<Modulo> {
    const foundmodulo = await this._moduloRepository.findOne(moduloid, {
      where: { status: 'ACTIVE' },
    });
    if (!foundmodulo) {
      throw new NotFoundException('module not exist');
    }
    foundmodulo.nombre = modulo.nombre;
    foundmodulo.nota = modulo.nota;
    foundmodulo.descripcion = modulo.descripcion;
    const updatemodulo = await this._moduloRepository.save(foundmodulo);
    return updatemodulo;
  }*/
  async delete(moduloId: string, user: User): Promise<boolean> {
    const foundmodulo = await this._moduloRepository
      .createQueryBuilder('modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('modulo.id = :idmodulo', { idmodulo: moduloId })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();

    if (!foundmodulo) {
      throw new NotFoundException('Module does not exist');
    }
    await this._moduloRepository.delete(foundmodulo);
    return true;
  }
}
