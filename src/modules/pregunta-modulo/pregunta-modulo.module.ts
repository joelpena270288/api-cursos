import { PreguntaModuloService } from './pregunta-modulo.service';
import { PreguntaModuloController } from './pregunta-modulo.controller';
import { Module } from '@nestjs/common';
import { PreguntaModuloRepository } from './pregunta-modulo.repository';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoRepository } from '../curso/curso.repository';
import { ModuloRepository } from '../modulo/modulo.repository';
import { ExamenModuloRepository } from "../examen-modulo/examen-modulo.repository";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      PreguntaModuloRepository,
      CursoRepository,
      ModuloRepository,
      ExamenModuloRepository,
    ]),
    AuthModule,
  ],
  controllers: [PreguntaModuloController],
  providers: [PreguntaModuloService],
})
export class PreguntaModuloModule {}
