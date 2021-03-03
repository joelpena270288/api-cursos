import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntaHtmlService } from './pregunta-html.service';
import { PreguntaHtmlRepository } from "./pregunta_html.repository";
import { EvaluacionRepository } from "../evaluacion/evalucion.repository";
import { PreguntaHtmlController } from './pregunta-html.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PreguntaHtmlRepository,EvaluacionRepository])],
  exports: [TypeOrmModule], 
  providers: [PreguntaHtmlService], controllers: [PreguntaHtmlController]
})
export class PreguntaHtmlModule {}
