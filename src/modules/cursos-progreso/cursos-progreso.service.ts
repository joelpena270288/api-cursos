import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DashboardRepository } from '../dashboard/dashboard.repository';
import { User } from '../user/user.entity';
import { CursosProgresoRepository } from './cursos-progreso.repository';
import { CursosProgreso } from './cursos-progreso.entity';
import { PlanEstudio } from '../plan-estudio/plan-estudio.entity';
import { PlanEstudioRepository } from '../plan-estudio/plan-estudio.repository';
import { Curso } from '../curso/curso.entity';
import { CursoRepository } from '../curso/curso.repository';
import { status } from '../../shared/entity-status.enum';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class CursosProgresoService {
  constructor(
    @InjectRepository(CursosProgresoRepository)
    private readonly _cursoProgresoRepository: CursosProgresoRepository,
    @InjectRepository(DashboardRepository)
    private readonly _dashboarRepository: DashboardRepository,
    @InjectRepository(PlanEstudioRepository)
    private readonly _planEstudioRepository: PlanEstudioRepository,
    @InjectRepository(Curso)
    private readonly _cursoRepository: CursoRepository,
  ) {}

  async create(id: number, user: User): Promise<CursosProgreso> {
    const dashboardfound = await this._dashboarRepository.findOne({
      where: { user: user },
    });
    if (!dashboardfound) {
      throw new BadRequestException('Complet your Perfil');
    }
    const cursofound = await this._cursoRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });
    if (!cursofound) {
      throw new BadRequestException('Course Not Found');
    }

    let planestudio: PlanEstudio = await this._planEstudioRepository.findOne({
      where: { dasboard: dashboardfound },
    });
    if (planestudio) {
      const cursosprogress = new CursosProgreso();
      cursosprogress.planEstudio = planestudio;
      //cursosprogress.curso = [cursofound];
      let result;
      try {
        result = await this._cursoProgresoRepository.save(cursosprogress);
      } catch (e) {
        console.log(e);
      }

      return result;
    }
    planestudio = new PlanEstudio();
   // planestudio.dasboard = dashboardfound;
    await this._planEstudioRepository.save(planestudio);
    const cursosprogress = new CursosProgreso();
    cursosprogress.planEstudio = planestudio;
   // cursosprogress.curso = [cursofound];
    const result = await this._cursoProgresoRepository.save(cursosprogress);
    return result;
  }
  async getCursoProgresoByUser(user: User): Promise<any> {
    const dashboardfound = await this._dashboarRepository.findOne({
      where: { user: user },
    });
    if (!dashboardfound) {
      throw new BadRequestException('Complet your Perfil');
    }
    let planestudio;
    try {
      planestudio = await this._planEstudioRepository
        .createQueryBuilder('planestudio')
        .leftJoinAndSelect('planestudio.cursosProgreso', 'cursoProgreso')
        .leftJoinAndSelect('cursoProgreso.curso', 'cursos')
        .where('planestudio.dasboard = :dashboard', {
          dashboard: dashboardfound.id,
        })
        .getOne();
    } catch (e) {
      console.log(e);
    }

    if (!planestudio) {
      throw new BadRequestException('You dot have any course');
    }

    return planestudio.cursosProgreso;
  }
}
