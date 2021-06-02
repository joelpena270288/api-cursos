import { Type } from 'class-transformer';
import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class PreguntaEstundentReadHtmlDto {
  @IsString()
  id: string;
  @IsBoolean()
  pregunta: String;
}
