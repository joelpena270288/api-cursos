import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ActividadEstudentReadDto, ActividadDto } from '../../actividad/dto';

export class ClaseReadDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly nombre: string;
  @IsString()
  readonly descripcion: string;
  @IsNumber()
  readonly nota: number;
  @IsNumber()
  readonly numeroclase: number;

  readonly actividades: ActividadEstudentReadDto;
}
