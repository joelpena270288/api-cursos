import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoRepository } from './video.repository';
import { Video } from './video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoRepository)
    private readonly _videoRepository: VideoRepository,
  ) {}

  async create(video: Video): Promise<Video> {
    const savedVideo: Video = await this._videoRepository.save(video);
    return savedVideo;
  }
  async getAllByIdClase(actividadid: number): Promise<Video[]> {
    const video: Video[] = await this._videoRepository.find({
      where: { actividad: actividadid },
    });
    return video;
  }
}
