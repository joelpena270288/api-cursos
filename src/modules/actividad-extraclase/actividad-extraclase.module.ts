import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadExtraclaseService } from './actividad-extraclase.service';
import { ActividadExtraclaseRepository } from './actividadextraclase.repository';
import { ActividadRepository } from '../actividad/actividad.repository';
import { ActividadExtraclaseController } from './actividad-extraclase.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActividadExtraclaseRepository,
      ActividadRepository,
    ]),
  ],
  exports: [TypeOrmModule],
  providers: [ActividadExtraclaseService],
  controllers: [ActividadExtraclaseController],
})
export class ActividadExtraclaseModule {}
