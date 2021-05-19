import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DashboardRepository } from '../dashboard/dashboard.repository';
import { User } from '../user/user.entity';
import { CursosProgresoRepository } from './cursos-progreso.repository';
import { CursosProgreso } from './cursos-progreso.entity';
import { PlanEstudio } from '../plan-estudio/plan-estudio.entity';
import { PlanEstudioRepository } from '../plan-estudio/plan-estudio.repository';
import { Curso } from '../curso/curso.entity';
import { CursoRepository } from '../curso/curso.repository';
import { status } from '../../shared/entity-status.enum';
import { createQueryBuilder } from 'typeorm';
import { UltimaClase } from '../ultima-clase/ultima-clase.entity';
import { UltimaClaseRepository } from '../ultima-clase/ultima-clase.repository';
import { PreguntaHtmlRepository } from '../pregunta-html/pregunta_html.repository';
import { PreguntaHtml } from '../pregunta-html/preguntahtml.entity';
import { ClasePasada } from '../clases-pasadas/clases-pasadas.entity';
import { ClasePasadaRepository } from '../clases-pasadas/clase-pasada.repository';
import { Clase } from '../clase/clase.entity';
import { ClaseRepository } from '../clase/clase.repository';
import { CursoProgresoPreguntaHtmlDto } from './dto/curso-progreso-preguntas-html.dto';
import { ModulosPasadosRepository } from '../modulos-pasados/modulos-pasados.repository';
import { ModulosPasados } from '../modulos-pasados/modulos-pasados.entity';
import { ModuloActual } from '../modulo-actual/modulo-actual.entity';
import { ModuloActualRepository } from '../modulo-actual/modulo-actual.repository';

@Injectable()
export class CursosProgresoService {
  constructor(
    @InjectRepository(CursosProgresoRepository)
    private readonly _cursoProgresoRepository: CursosProgresoRepository,
    @InjectRepository(DashboardRepository)
    private readonly _dashboarRepository: DashboardRepository,
    @InjectRepository(PlanEstudioRepository)
    private readonly _planEstudioRepository: PlanEstudioRepository,
    @InjectRepository(Curso)
    private readonly _cursoRepository: CursoRepository,
    @InjectRepository(UltimaClaseRepository)
    private readonly _ultimaClaseRepository: UltimaClaseRepository,
    @InjectRepository(PreguntaHtmlRepository)
    private readonly _preguntaHtmlRepository: PreguntaHtmlRepository,
    @InjectRepository(ClasePasadaRepository)
    private readonly _clasePasadaRepository: ClasePasadaRepository,
    @InjectRepository(ClaseRepository)
    private readonly _claseRepository: ClaseRepository,
    @InjectRepository(ModulosPasadosRepository)
    private readonly _modulosPasadosRepository: ModulosPasadosRepository,
    @InjectRepository(ModuloActualRepository)
    private readonly moduloActualRepository: ModuloActualRepository,
  ) {}

  async create(id: string, user: User): Promise<CursosProgreso> {
    const dashboardfound = await this._dashboarRepository.findOne({
      where: { user: user },
    });
    if (!dashboardfound) {
      throw new BadRequestException('You need complete your perfil');
    }
    const cursofound = await this._cursoRepository
      .createQueryBuilder('curso')
      .leftJoinAndSelect('curso.modulos', 'modulos')
      .leftJoinAndSelect('modulos.clases', 'clases')
      .where('curso.id = :id', { id: id })
      .getOne();
    if (!cursofound) {
      throw new BadRequestException('Course Not Found');
    }
    if (cursofound.modulos.length < 1) {
      throw new BadRequestException('This course dont have any Module');
    }
    if (cursofound.modulos[0].clases.length < 1) {
      throw new BadRequestException('This course dont have any lesson');
    }

    const cursoprogresoexiste = await this._planEstudioRepository
      .createQueryBuilder('planestudio')
      .innerJoin('planestudio.cursosProgreso', 'cursosProgreso')
      .innerJoin('planestudio.dashboard', 'dashboard')
      .innerJoin('cursosProgreso.curso', 'curso')
      .where('curso.id = :id', { id: id })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();
    if (cursoprogresoexiste) {
      throw new BadRequestException('You are in this course');
    }
    const cursopasadoexiste = await this._planEstudioRepository
      .createQueryBuilder('planestudio')
      .innerJoin('planestudio.cursosPasados', 'cursosPasados')
      .innerJoin('planestudio.dashboard', 'dashboard')
      .innerJoin('cursosPasados.curso', 'curso')
      .where('curso.id = :id', { id: id })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();
    if (cursopasadoexiste) {
      throw new BadRequestException('You passed this course');
    }

    let planestudio: PlanEstudio = await this._planEstudioRepository.findOne({
      where: { dashboard: dashboardfound },
    });

    if (planestudio) {
      const cursosprogress = new CursosProgreso();
      cursosprogress.planEstudio = planestudio;
      const moduloActual = new ModuloActual();
      const ultimaclase: UltimaClase = new UltimaClase();
      ultimaclase.clase = cursofound.modulos[0].clases[0];
      cursosprogress.curso = cursofound;

      const savedultimaclase: UltimaClase = await this._ultimaClaseRepository.save(
        ultimaclase,
      );
      moduloActual.ultimaclase = ultimaclase;
      moduloActual.modulo = cursofound.modulos[0];

      const savedModuloActual = await this.moduloActualRepository.save(
        moduloActual,
      );
      cursosprogress.moduloActual = savedModuloActual;

      //cursosprogress.ultimaclase = savedultimaclase;
      let result;
      try {
        result = await this._cursoProgresoRepository.save(cursosprogress);
      } catch (e) {
        console.log(e);
      }
      return result;
    }
    planestudio = new PlanEstudio();
    planestudio.dashboard = dashboardfound;
    await this._planEstudioRepository.save(planestudio);
    const cursosprogress = new CursosProgreso();
    const ultimaclase: UltimaClase = new UltimaClase();
    ultimaclase.clase = cursofound.modulos[0].clases[0];
    const savedultimaclase: UltimaClase = await this._ultimaClaseRepository.save(
      ultimaclase,
    );
    //cursosprogress.ultimaclase = savedultimaclase;
    cursosprogress.planEstudio = planestudio;
    cursosprogress.curso = cursofound;
    const result = await this._cursoProgresoRepository.save(cursosprogress);
    return result;
  }
  async getCursoProgresoByUser(user: User): Promise<any> {
    const dashboardfound = await this._dashboarRepository.findOne({
      where: { user: user },
    });
    if (!dashboardfound) {
      throw new BadRequestException('Complet your Perfil');
    }
    let planestudio;
    try {
      planestudio = await this._planEstudioRepository
        .createQueryBuilder('planestudio')
        .leftJoinAndSelect('planestudio.cursosProgreso', 'cursoProgreso')
        .leftJoinAndSelect('cursoProgreso.curso', 'cursos')
        .where('planestudio.dashboard = :dashboard', {
          dashboard: dashboardfound.id,
        })
        .getOne();
    } catch (e) {
      console.log(e);
    }

    if (!planestudio) {
      throw new BadRequestException('You dot have any course');
    }

    return planestudio.cursosProgreso;
  }
  async getCursoById(idcurso: string, user: User): Promise<CursosProgreso> {
    let curso;
    try {
      curso = await this._cursoProgresoRepository
        .createQueryBuilder('cursoprogreso')
        .leftJoinAndSelect('cursoprogreso.curso', 'curso')
        .innerJoin('curso.modulos', 'modulos')
        .addOrderBy('modulos.numeromodulo')

        .leftJoinAndSelect('cursoprogreso.moduloActual', 'moduloActual')
        .leftJoinAndSelect('cursoprogreso.modulospasados', 'modulospasados')
        .leftJoinAndSelect('modulospasados.clasespasadas', 'clasespasadas')
        .leftJoinAndSelect('clasespasadas.clase', 'class')

        .leftJoinAndSelect('moduloActual.ultimaclase', 'ultimaclase')
        .leftJoinAndSelect('moduloActual.clasespasadas', 'allclasespasadas')

        .leftJoinAndSelect('moduloActual.modulo', 'modulo')
        .leftJoinAndSelect('modulo.examen', 'examen')
        .leftJoinAndSelect('examen.preguntasModulo', 'preguntasModulo')
        .leftJoinAndSelect('preguntasModulo.preguntachecked', 'preguntachecked')
        .leftJoinAndSelect(
          'preguntasModulo.preguntacomplete',
          'preguntacomplete',
        )
        .leftJoinAndSelect(
          'preguntasModulo.preguntamultiselected',
          'preguntamultiselected',
        )
        .leftJoinAndSelect('preguntasModulo.preguntaVoF', 'preguntaVoF')
        .leftJoinAndSelect('ultimaclase.clase', 'clase')

        .leftJoinAndSelect('clase.actividades', 'actividades')
        .addOrderBy('actividades.numero')
        .leftJoinAndSelect('class.actividades', 'allactividades')
        .addOrderBy('allactividades.numero')
        .leftJoinAndSelect('actividades.videos', 'videos')
        .leftJoinAndSelect('allactividades.videos', 'allvideos')
        .leftJoinAndSelect('actividades.documentos', 'documentos')
        .leftJoinAndSelect('allactividades.documentos', 'alldocumentos')
        .leftJoinAndSelect('actividades.contenidos', 'contenidos')
        .leftJoinAndSelect('allactividades.contenidos', 'allcontenidos')
        .leftJoinAndSelect('actividades.preguntas_html', 'preguntas_html')
        .leftJoinAndSelect('allactividades.preguntas_html', 'allpreguntas_html')
        .leftJoinAndSelect(
          'actividades.actividades_extraclases',
          'actividades_extraclases',
        )
        .leftJoinAndSelect(
          'allactividades.actividades_extraclases',
          'allactividades_extraclases',
        )

        .innerJoin('cursoprogreso.planEstudio', 'planEstudio')
        .innerJoin('planEstudio.dashboard', 'dashboard')
        .where('cursoprogreso.id = :id', { id: idcurso })
        .andWhere('dashboard.user = :user', { user: user.id })
        .getOne();
    } catch (e) {
      console.log(e);
    }
    return curso;
  }
  async evaluarClase(
    cursoProgresoPreguntaHtmlDto: CursoProgresoPreguntaHtmlDto,
    user: User,
  ): Promise<any> {
    const cursoprogresofound = await this._cursoProgresoRepository
      .createQueryBuilder('cursoprogreso')
      .leftJoinAndSelect('cursoprogreso.moduloActual', 'moduloActual')
      .leftJoinAndSelect('cursoprogreso.curso', 'curso')
      .leftJoinAndSelect('curso.modulos', 'modulos')
      .leftJoinAndSelect('modulos.clases', 'clases')
      .leftJoinAndSelect('moduloActual.modulo', 'modulo')
      .addOrderBy('modulos.numeromodulo')
      .leftJoinAndSelect('moduloActual.ultimaclase', 'ultimaclase')
      .leftJoinAndSelect('ultimaclase.clase', 'clase')
      .leftJoinAndSelect('clase.actividades', 'actividades')
      .addOrderBy('actividades.numero')
      .leftJoinAndSelect('actividades.preguntas_html', 'preguntas_html')
      .innerJoin('cursoprogreso.planEstudio', 'planEstudio')
      .innerJoin('planEstudio.dashboard', 'dashboard')
      .where('cursoprogreso.id = :id', { id: cursoProgresoPreguntaHtmlDto.id })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();

    if (!cursoprogresofound) {
      throw new BadRequestException(
        'No tienes esta pregunta en tu plan de estudio',
      );
    }
    let total = 0;
    let acertadas = 0;

    for (let i = 0; i < cursoProgresoPreguntaHtmlDto.preguntas.length; i++) {
      const preguntasHtml = await this._preguntaHtmlRepository
        .createQueryBuilder('preguntas')
        .innerJoin('preguntas.actividad', 'actividad')
        .innerJoin('actividad.clase', 'clase')
        .where('clase.id = :id', {
          id: cursoProgresoPreguntaHtmlDto.idclase,
        })
        .andWhere('preguntas.id = :idpregunta', {
          idpregunta: cursoProgresoPreguntaHtmlDto.preguntas[i].id,
        })
        .getOne();
      if (preguntasHtml) {
        total += preguntasHtml.punto;
        if (
          preguntasHtml.respuesta ===
          cursoProgresoPreguntaHtmlDto.preguntas[i].respuesta
        )
          acertadas += preguntasHtml.punto;
      }
    }
    let result = 0;
    if (total === 0) {
      result = 100;
    } else if (acertadas === 0) {
      result = 0;
    } else {
      result = (acertadas / total) * 100;
    }

    if (result === 100) {
      const posultimoModulo = cursoprogresofound.curso.modulos.length - 1;
      const posultimaClaseCurso =
        cursoprogresofound.curso.modulos[posultimoModulo].clases.length - 1;
      if (
        cursoprogresofound.curso.modulos[posultimoModulo].id ===
        cursoProgresoPreguntaHtmlDto.id
      ) {
        if (
          cursoprogresofound.curso.modulos[posultimoModulo].clases[
            posultimaClaseCurso
          ].id === cursoProgresoPreguntaHtmlDto.idclase
        ) {
          const nuevaclasepasada = new ClasePasada();
          nuevaclasepasada.clase =
            cursoprogresofound.curso.modulos[posultimoModulo].clases[
              posultimaClaseCurso
            ];
          nuevaclasepasada.moduloActual = cursoprogresofound.moduloActual;

          const savedclasePasada = await this._clasePasadaRepository.save(
            nuevaclasepasada,
          );

          cursoprogresofound.moduloActual.ultimaclase.nota = result;
          this._ultimaClaseRepository.save(
            cursoprogresofound.moduloActual.ultimaclase,
          );
          throw new BadRequestException('You passed all modules');
        } else {
          for (
            let i = 0;
            i < cursoprogresofound.curso.modulos[posultimoModulo].clases.length;
            i++
          ) {
            if (
              cursoprogresofound.curso.modulos[posultimoModulo].clases[i].id ===
              cursoProgresoPreguntaHtmlDto.idclase
            ) {
              const nuevaclasepasada = new ClasePasada();
              nuevaclasepasada.clase =
                cursoprogresofound.curso.modulos[posultimoModulo].clases[i];
              nuevaclasepasada.moduloActual = cursoprogresofound.moduloActual;

              const savedclasePasada = await this._clasePasadaRepository.save(
                nuevaclasepasada,
              );
              cursoprogresofound.moduloActual.ultimaclase.clase =
                cursoprogresofound.curso.modulos[posultimoModulo].clases[i];
              this._ultimaClaseRepository.save(
                cursoprogresofound.moduloActual.ultimaclase,
              );
            }
          }
        }
      } else {
        const listaclases = await this._claseRepository
          .createQueryBuilder('clase')
          .addOrderBy('clase.numeroclase')
          .innerJoin('clase.modulo', 'modulo')
          .where('modulo.id = :id', {
            id: cursoProgresoPreguntaHtmlDto.id,
          })
          .getMany();
        for (let k = 0; k < listaclases.length; k++) {
          if (
            listaclases[k].id === cursoProgresoPreguntaHtmlDto.idclase &&
            cursoprogresofound.moduloActual.ultimaclase.clase.id
          ) {
            if (k === listaclases.length - 1) {
              const nuevaclasepasada = new ClasePasada();
              nuevaclasepasada.clase =
                cursoprogresofound.curso.modulos[posultimoModulo].clases[k];
              nuevaclasepasada.moduloActual = cursoprogresofound.moduloActual;

              const savedclasePasada = await this._clasePasadaRepository.save(
                nuevaclasepasada,
              );
              cursoprogresofound.moduloActual.ultimaclase.clase =
                cursoprogresofound.curso.modulos[posultimoModulo].clases[k];
              this._ultimaClaseRepository.save(
                cursoprogresofound.moduloActual.ultimaclase,
              );
            } else {
              const nuevaclasepasada = new ClasePasada();
              nuevaclasepasada.clase =
                cursoprogresofound.curso.modulos[posultimoModulo].clases[k];
              nuevaclasepasada.moduloActual = cursoprogresofound.moduloActual;

              const savedclasePasada = await this._clasePasadaRepository.save(
                nuevaclasepasada,
              );
              cursoprogresofound.moduloActual.ultimaclase.clase =
                cursoprogresofound.curso.modulos[posultimoModulo].clases[k + 1];
              this._ultimaClaseRepository.save(
                cursoprogresofound.moduloActual.ultimaclase,
              );
            }
          }
        }
      }
    }
    return result;
  }
}
