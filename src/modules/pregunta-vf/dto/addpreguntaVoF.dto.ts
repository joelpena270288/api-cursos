import { Type } from 'class-transformer';
import { IsNumber, IsString, IsBoolean } from 'class-validator';
export class AddpreguntaVoFdto {
  @IsNumber()
  readonly idpregunta: number;



}
