import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PreguntaInDtoHtml } from '../../pregunta-html/dto/pregunta-htm-read.dto';
import { ClasePasada } from '../../clases-pasadas/clases-pasadas.entity';

export class ActividadDto {
  @IsNumber()
  readonly id: number;
  
  readonly fecha_inicio_incripcion: string;
  @IsString()
  readonly fecha_fin_incripcion: string;

  clasespasadas: ClasePasada[];

  preguntas: PreguntaInDtoHtml[];
}