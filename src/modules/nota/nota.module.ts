import { Module } from '@nestjs/common';
import { NotaService } from './nota.service';
import {NotaRepository} from './nota.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import {ActividadRepository} from '../actividad/actividad.repository';
import { NotaController } from './nota.controller';

@Module({
imports: [TypeOrmModule.forFeature([UserRepository,NotaRepository,ActividadRepository])],
exports: [TypeOrmModule], 
  providers: [NotaService], controllers: [NotaController]
})
export class NotaModule {}
