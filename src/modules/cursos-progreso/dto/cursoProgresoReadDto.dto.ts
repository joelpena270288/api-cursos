import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PreguntaInDtoHtml } from '../../pregunta-html/dto/pregunta-htm-read.dto';
import { ClasePasada } from '../../clases-pasadas/clases-pasadas.entity';

export class CursoProgresoReadDto {
  @IsString()
  readonly id: string;

  readonly fecha_inicio_incripcion: string;
  @IsString()
  readonly fecha_fin_incripcion: string;

  clasespasadas: ClasePasada[];

  preguntas: PreguntaInDtoHtml[];
}
