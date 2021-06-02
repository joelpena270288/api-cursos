import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ClasePasada } from '../../clases-pasadas/clases-pasadas.entity';


export class ReadModuloActualDto {
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
  @Type((type) => ClasePasada)
  clasespasadas: ClasePasada[];
}
