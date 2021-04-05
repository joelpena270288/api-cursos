import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoService } from './curso.service';
import { CursoRepository } from "./curso.repository";
import { ModuloRepository } from "../modulo/modulo.repository";

import { CursoController } from './curso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CursoRepository,ModuloRepository])],
exports: [TypeOrmModule],
  providers: [CursoService],
  controllers: [CursoController]
})
export class CursoModule {}
