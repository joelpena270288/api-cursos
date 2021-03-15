import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PreguntaHtmlRepository } from './pregunta_html.repository';
import { PreguntaHtml } from './preguntahtml.entity';

@Injectable()
export class PreguntaHtmlService {
  constructor(
    @InjectRepository(PreguntaHtmlRepository)
    private readonly _preguntahtmlRepository: PreguntaHtmlRepository,
  ) {}

  async create(preguntahtml: PreguntaHtml): Promise<PreguntaHtml> {
    const savedPreguntahtml: PreguntaHtml = await this._preguntahtmlRepository.save(
      preguntahtml,
    );
    return savedPreguntahtml;
  }
  async getAllByIdClase(actividadid: number): Promise<PreguntaHtml[]> {
    const preguntahtml: PreguntaHtml[] = await this._preguntahtmlRepository.find(
      {
        where: { actividad: actividadid },
      },
    );
    return preguntahtml;
  }
}
