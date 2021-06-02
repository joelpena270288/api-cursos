import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

import { PreguntaEstundentReadHtmlDto } from '../../pregunta-html/dto';
import { Video } from '../../video/video.entity';
import { Contenido } from '../../contenido/contenido.entity';
import { ActividadesExtraclase } from '../../actividad-extraclase/actividadextraclase.entity';

export class ActividadEstudentReadDto {
  @IsString()
  readonly id: string;
  @Type((type) => PreguntaEstundentReadHtmlDto)
  readonly preguntas_html: PreguntaEstundentReadHtmlDto[];
  @Type((type) => Contenido)
  readonly contenidos: Contenido[];
  @Type((type) => Video)
  readonly videos: Video[];
  @Type((type) => ActividadesExtraclase)
  readonly actividades_extraclases: ActividadesExtraclase[];
}
