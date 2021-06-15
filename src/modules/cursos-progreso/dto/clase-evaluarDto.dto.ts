import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PreguntaInDtoHtml } from '../../pregunta-html/dto/pregunta-htm-read.dto';

export class ClaseEvaluarDto {
  @IsString()
  id: string;
  preguntas: PreguntaInDtoHtml[];
}
