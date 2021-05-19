import { PreguntaValueService } from './pregunta-valueVoF.service';
import { PreguntaValueController } from './pregunta-valueVoF.controller';
import { PreguntaValueVoFRepository } from './pregunta-valueVoF.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { PreguntaVfRepository } from '../pregunta-vf/pregunta-vf.repository';
import {PreguntaModuloRepository} from "../pregunta-modulo/pregunta-modulo.repository";
import { PreguntaMultiselectedRepository } from '../pregunta-multiselected/pregunta-multiselected.repository';
import { ModuloRepository } from '../modulo/modulo.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PreguntaValueVoFRepository,
      PreguntaVfRepository,
      PreguntaModuloRepository,
      PreguntaMultiselectedRepository,
      ModuloRepository,
    ]),
    AuthModule,
  ],
  controllers: [PreguntaValueController],
  providers: [PreguntaValueService],
})
export class PreguntaValueModule {}
