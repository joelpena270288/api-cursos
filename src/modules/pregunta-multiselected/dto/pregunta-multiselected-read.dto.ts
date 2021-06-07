import { Type } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class PreguntaMultiselectedReadDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly respuesta: string[];
}