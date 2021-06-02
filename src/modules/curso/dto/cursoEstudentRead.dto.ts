import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ReadCursoEstudentDto {
  @IsNumber()
  readonly id: number;
  @IsString()
  readonly nombre: string;
  @IsNumber()
  readonly nota: number;
  @IsNumber()
  readonly precio: number;
  @IsString()
  readonly descripcion: string;
 
}
