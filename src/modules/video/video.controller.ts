import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
  } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './video.entity';

@Controller('video')
export class VideoController {
    constructor(private readonly _videoService: VideoService) {}
    @Post()
    createVideo(@Body() video: Video): Promise<Video> {
      return this._videoService.create(video);
    }
    @Get('/byidactividad/:idactividad')
  getAllModuloByIdCurso(
    @Param('idactividad', ParseIntPipe) idactividad: number,
  ): Promise<Video[]> {
    return this._videoService.getAllByIdClase(idactividad);
  }
}
