import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuloService } from './modulo.service';
import { CursoRepository } from '../curso/curso.repository';
import { ModuloRepository } from './modulo.repository';
import { ClaseRepository } from '../clase/clase.repository';
import { ModuloController } from './modulo.controller';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../user/user.repository';
import { DashboardRepository } from '../dashboard/dashboard.repository';
import { ExamenModuloRepository } from '../examen-modulo/examen-modulo.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CursoRepository,
      ModuloRepository,
      ClaseRepository,
      UserRepository,
      DashboardRepository,
      ExamenModuloRepository,
    ]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
  providers: [ModuloService],
  controllers: [ModuloController],
})
export class ModuloModule {}
