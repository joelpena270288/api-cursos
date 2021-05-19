import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PreguntaHtmlRepository } from './pregunta_html.repository';
import { PreguntaHtml } from './preguntahtml.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PreguntaHtmlService {
  constructor(
    @InjectRepository(PreguntaHtmlRepository)
    private readonly _preguntahtmlRepository: PreguntaHtmlRepository,
  ) {}

  
  async getAllByIdClase(actividadid: string): Promise<PreguntaHtml[]> {
    const preguntahtml: PreguntaHtml[] = await this._preguntahtmlRepository.find(
      {
        where: { actividad: actividadid },
      },
    );
    return preguntahtml;
  }
  async update(
    idpregunta: string,
    pregunta: PreguntaHtml,
    user: User,
  ): Promise<boolean> {
    const preguntafound = await this._preguntahtmlRepository
      .createQueryBuilder('pregunta')
      .innerJoin('pregunta.actividad', 'actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('pregunta.id = :idpregunta', { idpregunta: idpregunta })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();
    if (!preguntafound) {
      throw new NotFoundException('this Question does not found');
    }
   
    preguntafound.pregunta = pregunta.pregunta;
    preguntafound.respuesta = pregunta.respuesta;
    preguntafound.punto = pregunta.punto;
    preguntafound.updatedAt = pregunta.updatedAt;
    let savedpregunta;
    try {
      savedpregunta = await this._preguntahtmlRepository.save(
        preguntafound,
      );
    } catch (e) {
      console.log(e);
    }
    if (!savedpregunta) {
      throw new NotFoundException('Dont was saved this Question');
    }
    return true;
  }
  async delete(preguntaid: string, user: User): Promise<boolean> {
    const questionFound = await this._preguntahtmlRepository
      .createQueryBuilder('pregunta')
      .innerJoin('pregunta.actividad', 'actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('pregunta.id = :preguntaid', { preguntaid: preguntaid })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();

    if (!questionFound) {
      throw new NotFoundException('Question does not exist');
    }
    await this._preguntahtmlRepository.delete(questionFound);
    return true;
  }
}
