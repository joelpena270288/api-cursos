import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoService } from './curso.service';
import { CursoRepository } from './curso.repository';
import { ModuloRepository } from '../modulo/modulo.repository';

import { CursoController } from './curso.controller';
import { DashboardRepository } from '../dashboard/dashboard.repository';
import { AuthModule } from '../auth/auth.module';
import {CursosProgresoRepository} from '../cursos-progreso/cursos-progreso.repository';
import {CursosPasadosRepository} from '../cursos-pasados/cursos-pasados.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CursoRepository,
      ModuloRepository,
      DashboardRepository,
      CursosProgresoRepository,
      CursosPasadosRepository,
    ]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
  providers: [CursoService],
  controllers: [CursoController],
})
export class CursoModule {}
