import { CursosProgresoService } from './cursos-progreso.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosProgresoRepository } from './cursos-pasados.repository';
import { AuthModule } from '../auth/auth.module';
import { CursoRepository } from '../curso/curso.repository';
import { DashboardRepository } from '../dashboard/dashboard.repository';
import { PlanEstudioRepository } from '../plan-estudio/plan-estudio.repository';
import { CursosProgresoController } from './cursos-progreso.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CursoRepository,
      DashboardRepository,
      CursosProgresoRepository,
      PlanEstudioRepository,
    ]),
    AuthModule,
  ],
  controllers: [CursosProgresoController],
  providers: [CursosProgresoService],
})
export class CursosProgresoModule {}
