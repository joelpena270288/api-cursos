import { PreguntaService } from './pregunta.service';
import { PreguntaController } from './pregunta.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntaRepository } from './pregunta.repository';
import { PreguntaModuloRepository } from '../pregunta-modulo/pregunta-modulo.repository';
import {ModuloRepository} from '../modulo/modulo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PreguntaRepository, PreguntaModuloRepository, ModuloRepository]), AuthModule],
  controllers: [PreguntaController],
  providers: [PreguntaService],
})
export class PreguntaModule {}
