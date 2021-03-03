import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentoService } from './documento.service';
import { DocumentoRepository } from "./documento.repository";
import { ActividadRepository } from "../actividad/actividad.repository";
import { DocumentoController } from './documento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentoRepository,ActividadRepository])],
  exports: [TypeOrmModule], 
  providers: [DocumentoService], controllers: [DocumentoController]
})
export class DocumentoModule {}
