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
import { copyFile } from 'node:fs';

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
      .addOrderBy('modulos.numeromodulo')
      .leftJoinAndSelect('modulos.clases', 'clases')
      .addOrderBy('clases.numeroclase')
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
        .leftJoinAndSelect('modulospasados.modulo', 'modulopasado')
        .addOrderBy('modulopasado.numeromodulo')
        .leftJoinAndSelect('modulopasado.clases', 'clasesMP')
        .addOrderBy('clasesMP.numeroclase')
        .leftJoinAndSelect('clasesMP.actividades', 'actividadesMP')
        .leftJoinAndSelect('actividadesMP.videos', 'videosMP')
        .leftJoinAndSelect('actividadesMP.documentos', 'documentosMP')
        .leftJoinAndSelect('actividadesMP.contenidos', 'contenidosMP')
        .leftJoinAndSelect('actividadesMP.preguntas_html', 'preguntas_htmlMP')
        .leftJoinAndSelect(
          'actividadesMP.actividades_extraclases',
          'actividades_extraclasesMP',
        )

        .leftJoinAndSelect('moduloActual.ultimaclase', 'ultimaclase')
        .leftJoinAndSelect('moduloActual.clasespasadas', 'allclasespasadas')
        .leftJoinAndSelect('allclasespasadas.clase', 'allpassclass')

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
        .leftJoinAndSelect('allpassclass.actividades', 'allpassactividades')
        .addOrderBy('allpassactividades.numero')

        .leftJoinAndSelect('actividades.videos', 'videos')
        .leftJoinAndSelect('allpassactividades.videos', 'passclassvideos')

        .leftJoinAndSelect('actividades.documentos', 'documentos')
        .leftJoinAndSelect(
          'allpassactividades.documentos',
          'passclassdocumentos',
        )

        .leftJoinAndSelect('actividades.contenidos', 'contenidos')
        .leftJoinAndSelect(
          'allpassactividades.contenidos',
          'passclasscontenidos',
        )

        .leftJoinAndSelect('actividades.preguntas_html', 'preguntas_html')
        .leftJoinAndSelect(
          'allpassactividades.preguntas_html',
          'passclasspreguntas_html',
        )

        .leftJoinAndSelect(
          'actividades.actividades_extraclases',
          'actividades_extraclases',
        )
        .leftJoinAndSelect(
          'allpassactividades.actividades_extraclases',
          'passclassactividades_extraclases',
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
      .leftJoinAndSelect('modulo.examen', 'examen')
      .leftJoinAndSelect('examen.preguntasModulo', 'preguntasModulo')
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
      const listaclases = await this._claseRepository
        .createQueryBuilder('clase')
        .addOrderBy('clase.numeroclase')
        .innerJoin('clase.modulo', 'modulo')
        .where('modulo.id = :id', {
          id: cursoprogresofound.moduloActual.modulo.id,
        })
        .getMany();
      for (let index = 0; index < listaclases.length; index++) {
        if (listaclases[index].id === cursoProgresoPreguntaHtmlDto.idclase) {
          if (
            index === listaclases.length - 1 &&
            cursoProgresoPreguntaHtmlDto.idclase !=
              cursoprogresofound.moduloActual.ultimaclase.clase.id
          ) {
            //this._cursoProgresoRepository.save(cursoprogresofound);
            const clasepasada = new ClasePasada();
            clasepasada.clase = listaclases[index];
            clasepasada.moduloActual = cursoprogresofound.moduloActual;
            this._clasePasadaRepository.save(clasepasada);
            if (cursoprogresofound.moduloActual.modulo.examen.preguntasModulo) {
              const ultimaclase = new UltimaClase();
              ultimaclase.examen =
                cursoprogresofound.moduloActual.modulo.examen;
              cursoprogresofound.moduloActual.ultimaclase = ultimaclase;

              this._cursoProgresoRepository.save(cursoprogresofound);
            } else {
              for (let j = 0; j < cursoprogresofound.curso.modulos.length; j++) {
                if (
                  cursoprogresofound.curso.modulos[j].id ===
                  cursoprogresofound.moduloActual.modulo.id
                ) {
                  if (j === cursoprogresofound.curso.modulos.length - 1) {
                    cursoprogresofound.moduloActual.ultimaclase.clase = null;
                    throw new BadRequestException('All modules was passed');
                  } else {
                    if (
                      cursoprogresofound.curso.modulos[j + 1].clases.length === 0
                    ) {
                      throw new BadRequestException(
                        'The next module not have any class',
                      );
                    }
                    const moduloPasado = new ModulosPasados();
                    moduloPasado.cursoProgreso = cursoprogresofound;
                    moduloPasado.modulo = cursoprogresofound.moduloActual.modulo;
                    this._modulosPasadosRepository.save(moduloPasado);
                    cursoprogresofound.moduloActual.modulo =
                      cursoprogresofound.curso.modulos[j + 1];
  
                    cursoprogresofound.moduloActual.ultimaclase.clase =
                      cursoprogresofound.curso.modulos[j + 1].clases[0];
                    cursoprogresofound.moduloActual.clasespasadas = null;
                    this._cursoProgresoRepository.save(cursoprogresofound);
                    break;
                  }
                }
              }
            }

           

            break;
          } else {
            const clasepasada = new ClasePasada();
            clasepasada.clase = listaclases[index];
            clasepasada.moduloActual = cursoprogresofound.moduloActual;
            this._clasePasadaRepository.save(clasepasada);
            cursoprogresofound.moduloActual.ultimaclase.clase =
              listaclases[index + 1];
            this._cursoProgresoRepository.save(cursoprogresofound);
            break;
          }
          break;
        }
      }
    }
    return result;
  }
}
