import { Module } from '@nestjs/common';
import { PreguntaVfController } from './pregunta-vf.controller';
import { PreguntaVfService } from './pregunta-vf.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntaVfRepository } from './pregunta-vf.repository';
import { AuthModule } from '../auth/auth.module';
import { PreguntaValueVoFRepository } from '../preguntas-valueVoF/pregunta-valueVoF.repository';
import { CursoRepository } from '../curso/curso.repository';
import { ModuloRepository } from '../modulo/modulo.repository';
import { ExamenModuloRepository } from '../examen-modulo/examen-modulo.repository';
import { PreguntaModuloRepository } from '../pregunta-modulo/pregunta-modulo.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PreguntaVfRepository,
      PreguntaValueVoFRepository,
      CursoRepository,
      ModuloRepository,
      ExamenModuloRepository,
      PreguntaModuloRepository,
    ]),
    AuthModule,
  ],
  controllers: [PreguntaVfController],
  providers: [PreguntaVfService],
})
export class PreguntaVfModule {}
