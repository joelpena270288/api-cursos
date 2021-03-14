import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntaHtmlService } from './pregunta-html.service';
import { PreguntaHtmlRepository } from './pregunta_html.repository';
import { ActividadRepository } from '../actividad/actividad.repository';
import { PreguntaHtmlController } from './pregunta-html.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PreguntaHtmlRepository, ActividadRepository]),
  ],
  exports: [TypeOrmModule],
  providers: [PreguntaHtmlService],
  controllers: [PreguntaHtmlController],
})
export class PreguntaHtmlModule {}
