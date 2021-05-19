import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PreguntaInDtoHtml } from '../../pregunta-html/dto/pregunta-htm-read.dto';

export class CursoProgresoPreguntaHtmlDto {
  @IsString()
  id: string;

  readonly fecha_inicio_incripcion: string;
  @IsString()
  readonly fecha_fin_incripcion: string;
  @IsString()
  readonly idclase: string;

  preguntas: PreguntaInDtoHtml[];
}
