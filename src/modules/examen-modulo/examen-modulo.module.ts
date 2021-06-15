import { ExamenModuloService } from './examen-modulo.service';
import { ExamenModuloController } from './examen-modulo.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuloRepository } from '../modulo/modulo.repository';
import { ExamenModuloRepository } from './examen-modulo.repository';
import { PreguntaCheckedRepository } from '../pregunta-cheked/pregunta-checked.repository';
import { PreguntaMultiselectedRepository } from '../pregunta-multiselected/pregunta-multiselected.repository';
import { PreguntaVfRepository } from '../pregunta-vf/pregunta-vf.repository';
import { PreguntaModuloRepository } from '../pregunta-modulo/pregunta-modulo.repository';
import { PreguntaValueVoFRepository } from '../preguntas-valueVoF/pregunta-valueVoF.repository';
import { CursosProgresoRepository } from '../cursos-progreso/cursos-progreso.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ModuloRepository,
      ExamenModuloRepository,
      PreguntaCheckedRepository,
      PreguntaMultiselectedRepository,
      PreguntaVfRepository,
      PreguntaModuloRepository,
      PreguntaValueVoFRepository,
      CursosProgresoRepository,
    ]),
    AuthModule,
  ],
  controllers: [ExamenModuloController],
  providers: [ExamenModuloService],
})
export class ExamenModuloModule {}
