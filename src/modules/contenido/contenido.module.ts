import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContenidoService } from './contenido.service';
import { ContenidoRepository } from "./contenido.repository";
import { ActividadRepository } from "../actividad/actividad.repository";
import { ContenidoController } from './contenido.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContenidoRepository,ActividadRepository])],
  exports: [TypeOrmModule], 
  providers: [ContenidoService], controllers: [ContenidoController]
})
export class ContenidoModule {}
