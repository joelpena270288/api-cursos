import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCursoService } from './estado-curso.service';
import { UserRepository } from '../user/user.repository';
import { CursoRepository } from "../curso/curso.repository";
import {EstadoCursoRepository  } from "./estado_curso.repository";
import { EstadoCursoController } from './estado-curso.controller';

@Module({
imports: [TypeOrmModule.forFeature([UserRepository,CursoRepository,EstadoCursoRepository])],
exports: [TypeOrmModule], 
  providers: [EstadoCursoService], controllers: [EstadoCursoController]
})
export class EstadoCursoModule {}
