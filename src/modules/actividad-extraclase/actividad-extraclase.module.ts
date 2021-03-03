import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadExtraclaseService } from './actividad-extraclase.service';
import { ActividadExtraclaseRepository } from "./actividadextraclase.repository";
import { EvaluacionRepository } from "../evaluacion/evalucion.repository";
import { ActividadExtraclaseController } from './actividad-extraclase.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadExtraclaseRepository,EvaluacionRepository])],
  exports: [TypeOrmModule], 
  providers: [ActividadExtraclaseService], controllers: [ActividadExtraclaseController]
})
export class ActividadExtraclaseModule {}
