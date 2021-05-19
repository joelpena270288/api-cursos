import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoService } from './video.service';
import { VideoRepository } from './video.repository';
import { ActividadRepository } from '../actividad/actividad.repository';
import { VideoController } from './video.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([VideoRepository, ActividadRepository]), AuthModule,],
  exports: [TypeOrmModule],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
