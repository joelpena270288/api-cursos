import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuloService } from './modulo.service';
import { CursoRepository } from "../curso/curso.repository";
import { ModuloRepository } from "./modulo.repository";
import { ClaseRepository } from "../clase/clase.repository";
import { ModuloController } from './modulo.controller';
@Module({
  imports: [TypeOrmModule.forFeature([CursoRepository,ModuloRepository,ClaseRepository])],
exports: [TypeOrmModule], 
  providers: [ModuloService], controllers: [ModuloController]
})
export class ModuloModule {}
