import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoService } from './video.service';
import { VideoRepository } from "./video.repository";
import { ActividadRepository } from "../actividad/actividad.repository";
import { VideoController } from './video.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VideoRepository,ActividadRepository])],
  exports: [TypeOrmModule], 
  providers: [VideoService], controllers: [VideoController]
})
export class VideoModule {}
