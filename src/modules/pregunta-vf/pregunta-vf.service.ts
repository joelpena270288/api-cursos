import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PreguntaVfRepository } from './pregunta-vf.repository';
import { PreguntaVf } from './pregunta-vf.entity';
import { PreguntaValueVoFRepository } from '../preguntas-valueVoF/pregunta-valueVoF.repository';
import { PreguntaValueVoF } from '../preguntas-valueVoF/pregunta-valueVoF.entity';
import { CursoRepository } from '../curso/curso.repository';
import { ModuloRepository } from '../modulo/modulo.repository';
import { ExamenModuloRepository } from '../examen-modulo/examen-modulo.repository';
import { User } from '../user/user.entity';
import { AddpreguntaVoFdto } from './dto/addpreguntaVoF.dto';
import { PreguntaModulo } from '../pregunta-modulo/pregunta-modulo.entity';
import { PreguntaModuloRepository } from '../pregunta-modulo/pregunta-modulo.repository';

@Injectable()
export class PreguntaVfService {
  constructor(
    private readonly _preguntaVfRepository: PreguntaVfRepository,
    private readonly _preguntaValueVoFRepository: PreguntaValueVoFRepository,
    private readonly _cursoRepository: CursoRepository,
    private readonly _moduloRepository: ModuloRepository,
    private readonly _examenModuloRepository: ExamenModuloRepository,
    private readonly _preguntaModuloRepository: PreguntaModuloRepository,
  ) {}

  async create(pregunta: AddpreguntaVoFdto, user: User): Promise<PreguntaVf> {
    let Mod;
    try {
      Mod = await this._moduloRepository
        .createQueryBuilder('modulo')
        .innerJoin('modulo.examen', 'examen')
        .innerJoin('examen.preguntasModulo', 'preguntasModulo')
        .innerJoin('modulo.curso', 'curso')
        .innerJoin('curso.dashboard', 'dashboard')
        .where('preguntasModulo.id = :id', { id: pregunta.idpregunta })
        .andWhere('dashboard.user = :user', { user: user.id })
        .getOne();
    } catch (e) {
      throw new NotFoundException('Internal Error');
    }
    if (!Mod) {
      throw new NotFoundException('You dont have permission for this Question');
    }
    let savedpregunta;
    try {
      const preguntaVoF = new PreguntaVf();
      savedpregunta = await this._preguntaVfRepository.save(preguntaVoF);
      const foundPregMod = await this._preguntaModuloRepository.findOne({
        where: { id: pregunta.idpregunta },
      });
      foundPregMod.preguntaVoF = savedpregunta;
      await this._preguntaModuloRepository.save(foundPregMod);
    } catch (e) {
      console.log(e);
    }
    return savedpregunta;
  }
}
