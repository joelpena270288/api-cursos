import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoService } from './curso.service';
import { CursoRepository } from "./curso.repository";
import { ModuloRepository } from "../modulo/modulo.repository";
import { EstadoCursoRepository } from "../estado-curso/estado_curso.repository";
import { CursoController } from './curso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CursoRepository,ModuloRepository,EstadoCursoRepository])],
exports: [TypeOrmModule],
  providers: [CursoService],
  controllers: [CursoController]
})
export class CursoModule {}
