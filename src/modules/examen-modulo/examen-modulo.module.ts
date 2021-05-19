import { ExamenModuloService } from './examen-modulo.service';
import { ExamenModuloController } from './examen-modulo.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ModuloRepository } from '../modulo/modulo.repository';
import { ExamenModuloRepository } from './examen-modulo.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
     
      ModuloRepository,
      ExamenModuloRepository,
    ]),
    AuthModule,
  ],
  controllers: [ExamenModuloController],
  providers: [ExamenModuloService],
})
export class ExamenModuloModule {}
