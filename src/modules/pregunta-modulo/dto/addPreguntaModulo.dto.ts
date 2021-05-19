import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
export class AddPreguntaModulodto {
  @IsNumber()
  readonly id: number;
  @IsNumber()
  readonly numeropregunta: number;
  @IsNumber()
  readonly valorpregunta: number;

}