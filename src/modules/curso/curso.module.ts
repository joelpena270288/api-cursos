import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoService } from './curso.service';
import { CursoRepository } from './curso.repository';
import { ModuloRepository } from '../modulo/modulo.repository';

import { CursoController } from './curso.controller';
import { DashboardRepository } from '../dashboard/dashboard.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CursoRepository,
      ModuloRepository,
      DashboardRepository,
    ]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
  providers: [CursoService],
  controllers: [CursoController],
})
export class CursoModule {}
