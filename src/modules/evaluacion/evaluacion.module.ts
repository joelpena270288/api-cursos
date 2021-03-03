import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionRepository } from "./evalucion.repository";
import { ActividadRepository } from "../actividad/actividad.repository";
import { EvaluacionController } from './evaluacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluacionRepository,ActividadRepository])],
  exports: [TypeOrmModule], 
  providers: [EvaluacionService], controllers: [EvaluacionController]
})
export class EvaluacionModule {}
