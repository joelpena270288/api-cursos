import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';
import { plainToClass } from 'class-transformer';
import { CursoRepository } from './curso.repository';
import { Curso } from './curso.entity';
import { ReadCursoDto } from './dto/read-curso.dto';
import { User } from '../user/user.entity';
import { DashboardRepository } from '../dashboard/dashboard.repository';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(CursoRepository)
    private readonly _cursoRepository: CursoRepository,
    @InjectRepository(DashboardRepository)
    private readonly _dashboarRepository: DashboardRepository,
  ) {}
  async create(curso: Curso, user: User): Promise<Curso> {
    const dashboardfound = await this._dashboarRepository.findOne({
      where: { user: user },
    });
    if (!dashboardfound) {
      throw new BadRequestException('Complet your Perfil');
    }
    curso.dashboard = dashboardfound;
    const savedCurso: Curso = await this._cursoRepository.save(curso);
    return curso;
  }
  async get(id: string): Promise<ReadCursoDto[]> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const dashboardfound = await this._dashboarRepository.findOne({
      where: { user: id },
    });

    const cursos: Curso[] = await this._cursoRepository.find({
      where: { status: status.ACTIVE, dashboard: dashboardfound },
    });
    if (cursos.length == 0) {
      throw new NotFoundException('You dont have any course');
    }

    return cursos.map((curso: Curso) => plainToClass(ReadCursoDto, curso));
  }
  async getAll(): Promise<ReadCursoDto[]> {
    const curso: Curso[] = await this._cursoRepository.find({
      where: { status: status.ACTIVE, disponible: true },
    });
    return curso.map((curso: Curso) => plainToClass(ReadCursoDto, curso));
  }

  async update(cursoid: string, curso: Curso): Promise<Curso> {
    const foundcurso = await this._cursoRepository.findOne(cursoid, {
      where: { status: 'ACTIVE' },
    });
    if (!foundcurso) {
      throw new NotFoundException('user not exist');
    }
    foundcurso.nombre = curso.nombre;
    foundcurso.nota = curso.nota;
    foundcurso.precio = curso.precio;
    const updatecurso = await this._cursoRepository.save(foundcurso);
    return updatecurso;
  }
  async delete(cursoId: string, user: User): Promise<boolean> {
    const foundCurso = await this._cursoRepository
      .createQueryBuilder('curso')
      .innerJoin('curso.dashboard', 'dashboard')

      .where('curso.id = :id', { id: cursoId })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();

    if (!foundCurso) {
      throw new NotFoundException('Course does not exist');
    }
    await this._cursoRepository.delete(foundCurso);
    return true;
  }
  async getAllByUser(user: User): Promise<Curso[]> {
    if (!user) {
      throw new BadRequestException('user must be sent');
    }
    const cursos: Curso[] = await this._cursoRepository.find({
      where: { status: status.ACTIVE, user: user },
    });
    if (!cursos) {
      throw new NotFoundException('this course does not found');
    }
    return cursos;
  }
  async cambiarEstado(user: User, id: string, estado: boolean): Promise<Curso> {
    const foundcurso = await this._cursoRepository
      .createQueryBuilder('curso')
      .innerJoin('curso.dashboard', 'dashboard')

      .where('curso.id = :id', { id: id })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();

    if (!foundcurso) {
      throw new NotFoundException('this course does not found');
    }
    if (estado) {
      foundcurso.disponible = true;
      await this._cursoRepository.save(foundcurso);
    } else {
      foundcurso.disponible = false;
      await this._cursoRepository.save(foundcurso);
    }
    return foundcurso;
  }
}
