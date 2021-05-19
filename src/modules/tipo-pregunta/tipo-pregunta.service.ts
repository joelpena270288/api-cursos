import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TipoPreguntaRepository } from './tipo-pregunta.repository';
import { TipoPregunta } from './tipo-pregunta.entity';

@Injectable()
export class TipoPreguntaService {
  constructor(
    private readonly _tipoPreguntaRepository: TipoPreguntaRepository,
  ) {}
  async getAllTipoPregunta(): Promise<string[]> {
    const alltipopregunta: TipoPregunta[] = await this._tipoPreguntaRepository.find();
    const result: string[] = [];
    for (let i = 0; i < alltipopregunta.length; i++) {
      result.push(alltipopregunta[i].nombre);
    }
    return result;
  }
}
