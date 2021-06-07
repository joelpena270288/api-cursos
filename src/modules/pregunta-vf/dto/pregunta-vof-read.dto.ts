import { Type } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import {PreguntaValueVoFInDto} from '../../preguntas-valueVoF/dto/pregunta-valueVoF-in.dto';
export class PreguntaVoFReadDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly respuesta: PreguntaValueVoFInDto[];
}