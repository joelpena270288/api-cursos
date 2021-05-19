import { Type } from 'class-transformer';
import { IsNumber, IsString, IsBoolean } from 'class-validator';
export class AddpreguntaCheckedDto {
  @IsNumber()
  readonly idpregunta: number;



}
