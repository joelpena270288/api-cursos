import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseService } from './clase.service';
import { ClaseRepository } from "./clase.repository";
import { ModuloRepository } from "../modulo/modulo.repository";
import { ActividadRepository } from "../actividad/actividad.repository";
import { ClaseController } from './clase.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClaseRepository,ModuloRepository,ActividadRepository])],
  exports: [TypeOrmModule], 
  providers: [ClaseService], controllers: [ClaseController]
})
export class ClaseModule {}
