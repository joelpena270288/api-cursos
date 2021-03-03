import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadService } from './actividad.service';
import { ActividadRepository } from "./actividad.repository";
import { VideoRepository } from "../video/video.repository";
import { ClaseRepository } from "../clase/clase.repository";
import { DocumentoRepository } from "../documento/documento.repository";
import { ContenidoRepository } from "../contenido/contenido.repository";
import { ActividadController } from './actividad.controller';


@Module({
  imports: [TypeOrmModule.forFeature([VideoRepository,ClaseRepository,ActividadRepository,DocumentoRepository,ContenidoRepository])],
  exports: [TypeOrmModule], 
  providers: [ActividadService], controllers: [ActividadController]
})
export class ActividadModule {}
