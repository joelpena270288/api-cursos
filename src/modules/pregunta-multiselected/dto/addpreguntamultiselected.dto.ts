import { Type } from 'class-transformer';
import { IsNumber, IsString, IsBoolean } from 'class-validator';
export class AddpreguntaMultiselectedDto {
  @IsString()
  readonly idPreguntaModulo: string;



}
