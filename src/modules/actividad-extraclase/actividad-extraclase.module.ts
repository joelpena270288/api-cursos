import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadExtraclaseService } from './actividad-extraclase.service';
import { ActividadExtraclaseRepository } from './actividadextraclase.repository';
import { ActividadRepository } from '../actividad/actividad.repository';
import { ActividadExtraclaseController } from './actividad-extraclase.controller';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActividadExtraclaseRepository,
      ActividadRepository,
    ]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
  providers: [ActividadExtraclaseService],
  controllers: [ActividadExtraclaseController],
})
export class ActividadExtraclaseModule {}
