import { Type } from 'class-transformer';
import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class PreguntaInDtoHtml {
  @IsString()
  id: string;
  @IsBoolean()
  respuesta: boolean;
}
