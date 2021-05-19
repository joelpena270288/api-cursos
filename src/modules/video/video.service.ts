import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoRepository } from './video.repository';
import { Video } from './video.entity';
import { User } from '../user/user.entity';

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
  async getAllByIdClase(actividadid: string): Promise<Video[]> {
    const video: Video[] = await this._videoRepository.find({
      where: { actividad: actividadid },
    });
    return video;
  }

  async update(idvideo: string, video: Video, user: User): Promise<boolean> {
    const videofound = await this._videoRepository
      .createQueryBuilder('video')
      .innerJoin('video.actividad', 'actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('video.id = :idvideo', { idvideo: idvideo })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();
    if (!videofound) {
      throw new NotFoundException('this Content does not found');
    }
    videofound.nombre = video.nombre;
    videofound.link = video.link;
    videofound.updatedAt = new Date();

    videofound.updatedAt = new Date();
    let savedcontenido;
    try {
      savedcontenido = await this._videoRepository.save(videofound);
    } catch (e) {
      console.log(e);
    }
    if (!savedcontenido) {
      throw new NotFoundException('Dont was saved video');
    }
    return true;
  }
  async delete(videoid: string, user: User): Promise<boolean> {
    const videoFound = await this._videoRepository
      .createQueryBuilder('video')
      .innerJoin('video.actividad', 'actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('video.id = :videoid', { videoid: videoid })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();

    if (!videoFound) {
      throw new NotFoundException('Video does not exist');
    }
    await this._videoRepository.delete(videoFound);
    return true;
  }
}
