import { Type } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
export class PreguntaValueVoFInDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly respuesta: string;
}