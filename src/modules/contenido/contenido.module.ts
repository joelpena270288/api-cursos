import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContenidoService } from './contenido.service';
import { ContenidoRepository } from "./contenido.repository";
import { ActividadRepository } from "../actividad/actividad.repository";
import { ContenidoController } from './contenido.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContenidoRepository,ActividadRepository]),   AuthModule,],
  exports: [TypeOrmModule], 
  providers: [ContenidoService], controllers: [ContenidoController]
})
export class ContenidoModule {}
