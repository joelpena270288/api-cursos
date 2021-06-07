import { Type } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { PreguntaCheckedReadDto } from '../../pregunta-cheked/dto/pregunta-checked-read.dto';
import { PreguntaMultiselectedReadDto } from '../../pregunta-multiselected/dto/pregunta-multiselected-read.dto';
import { PreguntaVoFReadDto } from '../../pregunta-vf/dto/pregunta-vof-read.dto';
export class ExmanenModuloInDto {
  @IsString()
  readonly id: string;
  readonly allpreguntaChecked: PreguntaCheckedReadDto[];
  readonly allrespuestaMultiselected: PreguntaMultiselectedReadDto[];
  readonly allrespuestasVoF: PreguntaVoFReadDto[];
}
