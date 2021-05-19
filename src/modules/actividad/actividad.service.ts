import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadRepository } from './actividad.repository';
import { ClaseRepository } from '../clase/clase.repository';
import { Actividad } from './actividad.entity';
import { status } from '../../shared/entity-status.enum';
import { User } from '../user/user.entity';
import { Video } from '../video/video.entity';
import { Contenido } from '../contenido/contenido.entity';
import { ActividadesExtraclase } from '../actividad-extraclase/actividadextraclase.entity';
import { PreguntaHtml } from '../pregunta-html/preguntahtml.entity';
import { Documento } from '../documento/documento.entity';
import { DocumentoRepository } from '../documento/documento.repository';
import { VideoRepository } from '../video/video.repository';
import { ContenidoRepository } from '../contenido/contenido.repository';
import { PreguntaHtmlRepository } from '../pregunta-html/pregunta_html.repository';
import { ActividadExtraclaseRepository } from '../actividad-extraclase/actividadextraclase.repository';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(ActividadRepository)
    private readonly _actividadRepository: ActividadRepository,
    @InjectRepository(ClaseRepository)
    private readonly _claseRepository: ClaseRepository,
    @InjectRepository(VideoRepository)
    private readonly _videoRepository: VideoRepository,
    @InjectRepository(DocumentoRepository)
    private readonly _documentoRepository: DocumentoRepository,
    @InjectRepository(ContenidoRepository)
    private readonly _contenidoRepository: ContenidoRepository,
    @InjectRepository(PreguntaHtmlRepository)
    private readonly _preguntaHtmlRepository: PreguntaHtmlRepository,
    @InjectRepository(ActividadExtraclaseRepository)
    private readonly _actividadExtraclaseRepository: ActividadExtraclaseRepository,
  ) {}
  async create(actividad: Actividad, user: User): Promise<Actividad> {
    let clase;
    try {
      clase = await this._claseRepository
        .createQueryBuilder('clase')
        .innerJoin('clase.modulo', 'modulo')
        .innerJoin('modulo.curso', 'curso')
        .innerJoin('curso.dashboard', 'dashboard')
        .where('dashboard.user = :user', { user: user.id })
        .getOne();
    } catch (e) {
      throw new BadRequestException(e);
    }

    const savedActividad: Actividad = await this._actividadRepository.save(
      actividad,
    );
    return savedActividad;
  }
  async get(actividadid: string): Promise<Actividad> {
    if (!actividadid) {
      throw new BadRequestException('id must be sent');
    }
    const actividad: Actividad = await this._actividadRepository.findOne(
      actividadid,
      {
        where: { status: status.ACTIVE },
      },
    );
    if (!actividad) {
      throw new NotFoundException('this activity does not found');
    }
    return actividad;
  }
  async getAll(): Promise<Actividad[]> {
    const actividad: Actividad[] = await this._actividadRepository.find({
      where: { status: status.ACTIVE },
    });
    return actividad;
  }

  async update(
    actividadid: string,
    actividadcompleta: Actividad,
    user: User,
  ): Promise<Actividad> {
    let actividad;
    try {
      actividad = await this._actividadRepository
        .createQueryBuilder('actividad')
        .innerJoin('actividad.clase', 'clase')
        .innerJoin('clase.modulo', 'modulo')
        .innerJoin('modulo.curso', 'curso')
        .innerJoin('curso.dashboard', 'dashboard')
        .where('actividad.id = :actividadid', { actividadid: actividadid })
        .andWhere('dashboard.user = :user', { user: user.id })
        .getOne();
    } catch (e) {
      console.log(e);
    }
    if (!actividad) {
      throw new NotFoundException('this activity does not found');
    }

    if (actividadcompleta.nombre) {
      actividad.nombre = actividadcompleta.nombre;
    }

    if (actividadcompleta.descripcion) {
      actividad.descripcion = actividadcompleta.descripcion;
    }
    if (actividadcompleta.numero > 0) {
      actividad.numero = actividadcompleta.numero;
    }
    if (
      actividadcompleta.videos[0].nombre !== '' &&
      actividadcompleta.videos[0].link !== ''
    ) {
      const vid: Video = new Video();
      vid.nombre = actividadcompleta.videos[0].nombre;
      vid.link = actividadcompleta.videos[0].link;

      vid.actividad = actividadcompleta.videos[0].actividad;
      try {
        await this._videoRepository.save(vid);
      } catch (e) {
        console.log(e);
      }
    }
    if (
      actividadcompleta.documentos[0].nombre !== '' &&
      actividadcompleta.documentos[0].link !== ''
    ) {
      const documento: Documento = new Documento();
      documento.nombre = actividadcompleta.documentos[0].nombre;
      documento.link = actividadcompleta.documentos[0].link;
      documento.actividad = actividadcompleta.documentos[0].actividad;
      try {
        await this._documentoRepository.save(documento);
      } catch (e) {
        console.log(e);
      }
    }
    if (
      actividadcompleta.contenidos[0].cuerpo != '' &&
      actividadcompleta.contenidos[0].cuerpo !== ''
    ) {
      const contenido: Contenido = new Contenido();
      contenido.cuerpo = actividadcompleta.contenidos[0].cuerpo;

      contenido.actividad = actividadcompleta.contenidos[0].actividad;
      try {
        await this._contenidoRepository.save(contenido);
      } catch (e) {
        console.log(e);
      }
    }
    if (
      actividadcompleta.preguntas_html[0].pregunta !== '' &&
      actividadcompleta.preguntas_html[0].punto > 0
    ) {
      const html: PreguntaHtml = new PreguntaHtml();
      html.punto = actividadcompleta.preguntas_html[0].punto;
      html.pregunta = actividadcompleta.preguntas_html[0].pregunta;
      html.actividad = actividadcompleta.preguntas_html[0].actividad;
      html.respuesta = actividadcompleta.preguntas_html[0].respuesta;
      try {
        await this._preguntaHtmlRepository.save(html);
      } catch (e) {
        console.log(e);
      }
    }
    if (
      actividadcompleta.actividades_extraclases[0].orientacion !== '' &&
      actividadcompleta.actividades_extraclases[0].orientacion !== ''
    ) {
      const extraclase: ActividadesExtraclase = new ActividadesExtraclase();
      extraclase.orientacion =
        actividadcompleta.actividades_extraclases[0].orientacion;
      extraclase.documentos =
        actividadcompleta.actividades_extraclases[0].documentos;
      extraclase.punto = actividadcompleta.actividades_extraclases[0].punto;
      extraclase.fecha_entrega =
        actividadcompleta.actividades_extraclases[0].fecha_entrega;
      extraclase.actividad =
        actividadcompleta.actividades_extraclases[0].actividad;
      try {
        await this._actividadExtraclaseRepository.save(extraclase);
      } catch (e) {
        console.log(e);
      }
    }
    try {
      await this._actividadRepository.save(actividad);
    } catch (e) {
      console.log(e);
    }

    actividad = await this._actividadRepository
      .createQueryBuilder('actividad')
      .leftJoinAndSelect('actividad.videos', 'videos')
      .leftJoinAndSelect('actividad.documentos', 'documentos')
      .leftJoinAndSelect('actividad.contenidos', 'contenidos')
      .leftJoinAndSelect('actividad.preguntas_html', 'preguntas_html')
      .leftJoinAndSelect(
        'actividad.actividades_extraclases',
        'actividades_extraclases',
      )
      .addOrderBy('actividad.numero')

      .where('actividad.id = :actividadid', { actividadid: actividad.id })

      .getOne();

    return actividad;
  }
  async delete(actividadId: string, user: User): Promise<boolean> {
    const actividadFound = await this._actividadRepository
      .createQueryBuilder('actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('actividad.id = :actividadid', { actividadid: actividadId })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();

    if (!actividadFound) {
      throw new NotFoundException('Activity does not exist');
    }
    await this._actividadRepository.delete(actividadFound);
    return true;
  }
  async getAllByIdClase(claseid: string, user: User): Promise<Actividad[]> {
    let actividad;
    try {
      actividad = await this._actividadRepository
        .createQueryBuilder('actividad')
        .leftJoinAndSelect('actividad.videos', 'videos')
        .leftJoinAndSelect('actividad.documentos', 'documentos')
        .leftJoinAndSelect('actividad.contenidos', 'contenidos')
        .leftJoinAndSelect('actividad.preguntas_html', 'preguntas_html')
        .leftJoinAndSelect(
          'actividad.actividades_extraclases',
          'actividades_extraclases',
        )
        .innerJoin('actividad.clase', 'clase')
        .innerJoin('clase.modulo', 'modulo')
        .innerJoin('modulo.curso', 'curso')
        .innerJoin('curso.dashboard', 'dashboard')
        .where('clase.id = :claseid', { claseid: claseid })
        .andWhere('dashboard.user = :user', { user: user.id })
        .addOrderBy('actividad.numero')
        .getMany();
    } catch (e) {
      throw new NotFoundException('Error in consult');
    }
    return actividad;
  }
}
