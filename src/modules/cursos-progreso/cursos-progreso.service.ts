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
import { ExamenFinalRepository } from '../examen-final-curso/examen-final.repository';
import { ExamenFinal } from '../examen-final-curso/examen-final.entity';
import { CursosPasadosRepository } from '../cursos-pasados/cursos-pasados.repository';
import { ExamenModuloRepository } from '../examen-modulo/examen-modulo.repository';

import { CursosPasados } from '../cursos-pasados/cursos-pasados.entity';
import { copyFile } from 'node:fs';
import { Modulo } from '../modulo/modulo.entity';
import { ModuloRepository } from '../modulo/modulo.repository';

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
    private readonly _moduloActualRepository: ModuloActualRepository,
    @InjectRepository(ExamenFinalRepository)
    private readonly _examenFinalRepository: ExamenFinalRepository,
    @InjectRepository(CursosPasadosRepository)
    private readonly _cursosPasadosRepository: CursosPasadosRepository,
    @InjectRepository(ExamenModuloRepository)
    private readonly _examenModuloRepository: ExamenModuloRepository,
    @InjectRepository(ModuloRepository)
    private readonly _moduloRepository: ExamenModuloRepository,
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

    const cursoprogresoexiste = await this._cursoProgresoRepository
      .createQueryBuilder('cursosprogreso')
      .leftJoinAndSelect('cursosprogreso.planEstudio', 'planEstudio')
      .innerJoin('cursosprogreso.curso', 'curso')
      .innerJoin('planEstudio.dashboard', 'dashboard')
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

    let planestudio: PlanEstudio = await this._planEstudioRepository
      .createQueryBuilder('planestudio')
      .innerJoin('planestudio.dashboard', 'dashboard')
      .where('dashboard.user = :user', { user: user.id })
      .getOne();
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
      moduloActual.ultimaclase = savedultimaclase;
      moduloActual.modulo = cursofound.modulos[0];

      const savedModuloActual = await this._moduloActualRepository.save(
        moduloActual,
      );
      cursosprogress.moduloActual = savedModuloActual;

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
    cursosprogress.planEstudio = planestudio;
    const moduloActual = new ModuloActual();
    const ultimaclase: UltimaClase = new UltimaClase();
    ultimaclase.clase = cursofound.modulos[0].clases[0];
    cursosprogress.curso = cursofound;

    const savedultimaclase: UltimaClase = await this._ultimaClaseRepository.save(
      ultimaclase,
    );
    moduloActual.ultimaclase = savedultimaclase;
    moduloActual.modulo = cursofound.modulos[0];

    const savedModuloActual = await this._moduloActualRepository.save(
      moduloActual,
    );
    cursosprogress.moduloActual = savedModuloActual;

    let result;
    try {
      result = await this._cursoProgresoRepository.save(cursosprogress);
    } catch (e) {
      console.log(e);
    }
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
        .innerJoin('cursoprogreso.planEstudio', 'planEstudio')
        .innerJoin('planEstudio.dashboard', 'dashboard')
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
        .leftJoinAndSelect('ultimaclase.examenModulo', 'examenModulo')
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
    const cantpreguntas = await this.totalPreguntasHtmlPorClase(
      cursoProgresoPreguntaHtmlDto,
    );
    let acertadas = 0;
    let nota = 0;
    for (let i = 0; i < cursoProgresoPreguntaHtmlDto.preguntas.length; i++) {
      const preguntashtml = await this._preguntaHtmlRepository
        .createQueryBuilder('preguntas')
        .innerJoin('preguntas.actividad', 'actividad')
        .innerJoin('actividad.clase', 'clase')
        .innerJoin('clase.modulo', 'modulo')
        .innerJoin('modulo.curso', 'curso')
        .innerJoin('curso.cursosprogreso', 'cursosprogreso')
        .where('cursosprogreso.id = :idcursosprogreso', {
          idcursosprogreso: cursoProgresoPreguntaHtmlDto.id,
        })
        .andWhere('clase.id= :idclase', {
          idclase: cursoProgresoPreguntaHtmlDto.idclase,
        })
        .andWhere('preguntas.id= :idpregunta', {
          idpregunta: cursoProgresoPreguntaHtmlDto.preguntas[i].id,
        })
        .andWhere('preguntas.respuesta= :respuesta', {
          respuesta: cursoProgresoPreguntaHtmlDto.preguntas[i].respuesta,
        })

        .getOne();

      if (preguntashtml) {
        acertadas += 1;
      }
    }
    if (cursoProgresoPreguntaHtmlDto.preguntas.length === 0) {
      nota = 100;
    } else if (
      acertadas === 0 &&
      cursoProgresoPreguntaHtmlDto.preguntas.length > 0
    ) {
      nota = 0;
    } else {
      nota = (acertadas / cantpreguntas) * 100;
    }
    if (nota === 100) {
      let cursoprogreso = new CursosProgreso();
      try {
        cursoprogreso = await this._cursoProgresoRepository
          .createQueryBuilder('cursosprogreso')
          .leftJoinAndSelect('cursosprogreso.planEstudio', 'planEstudio')
          .leftJoinAndSelect('planEstudio.dashboard', 'dashboard')
          .leftJoinAndSelect('cursosprogreso.curso', 'curso')
          .leftJoinAndSelect('cursosprogreso.moduloActual', 'moduloActual')
          .leftJoinAndSelect('moduloActual.ultimaclase', 'ultimaclase')
          .leftJoinAndSelect('moduloActual.modulo', 'modulo')
          .leftJoinAndSelect('modulo.examen', 'examen')
          .leftJoinAndSelect('examen.preguntasModulo', 'preguntasModulo')
          .leftJoinAndSelect('ultimaclase.clase', 'clase')
          .leftJoinAndSelect('dashboard.user', 'user')
          .where('cursosprogreso.id = :idcursosprogreso', {
            idcursosprogreso: cursoProgresoPreguntaHtmlDto.id,
          })
          .andWhere('dashboard.user = :user', { user: user.id })
          .getOne();
      } catch (e) {
        console.log(e);
      }
      if (!cursoprogreso) {
        throw new BadRequestException('Error in ');
      }
      let clasepasada = new Clase();
      try {
        clasepasada = await this._claseRepository
          .createQueryBuilder('clasepas')
          .leftJoinAndSelect('clasepas.modulo', 'modulo')
          .leftJoinAndSelect('modulo.curso', 'curso')
          .leftJoinAndSelect('curso.cursosprogreso', 'cursosprogreso')
          .leftJoinAndSelect('cursosprogreso.moduloActual', 'moduloActual')
          .leftJoinAndSelect('moduloActual.clasespasadas', 'clasespasadas')
          .leftJoinAndSelect('clasespasadas.clase', 'clase')
          .leftJoinAndSelect('cursosprogreso.planEstudio', 'planEstudio')
          .leftJoinAndSelect('planEstudio.dashboard', 'dashboard')
          .leftJoinAndSelect('dashboard.user', 'user')
          .where('user.id = :user', { user: user.id })
          .andWhere('cursosprogreso.id = :idcursosprogreso', {
            idcursosprogreso: cursoProgresoPreguntaHtmlDto.id,
          })
          .andWhere('clase.id = :id', {
            id: cursoProgresoPreguntaHtmlDto.idclase,
          })

          .getOne();
      } catch (e) {
        console.log(e);
      }
      let siguienteclase = new Clase();
      if (
        cursoprogreso.moduloActual.ultimaclase.clase.id ===
        cursoProgresoPreguntaHtmlDto.idclase
      ) {
        try {
          siguienteclase = await this._claseRepository
            .createQueryBuilder('clase')
            .orderBy('clase.numeroclase', 'ASC')
            .innerJoin('clase.modulo', 'modulo')
            .innerJoin('modulo.curso', 'curso')
            .where('curso.id = :id', { id: cursoprogreso.curso.id })
            .andWhere('modulo.id = :idmodulo', {
              idmodulo: cursoprogreso.moduloActual.modulo.id,
            })
            .andWhere('clase.numeroclase > :numeroclase', {
              numeroclase:
                cursoprogreso.moduloActual.ultimaclase.clase.numeroclase,
            })
            .getOne();
        } catch (e) {
          console.log(e);
        }
      

        if (siguienteclase) {
          if (!clasepasada) {
            const clasepasada = new ClasePasada();
            clasepasada.moduloActual = cursoprogreso.moduloActual;
            clasepasada.clase = cursoprogreso.moduloActual.ultimaclase.clase;
            cursoprogreso.moduloActual.ultimaclase.clase = siguienteclase;
            await this._clasePasadaRepository.save(clasepasada);
           
            await this._ultimaClaseRepository.save(
              cursoprogreso.moduloActual.ultimaclase,
            );

          }
        } else {
          if (
            cursoprogreso.moduloActual.modulo.examen.preguntasModulo.length > 0
          ) {
            if (!clasepasada) {
              const clasepasada = new ClasePasada();
              clasepasada.moduloActual = cursoprogreso.moduloActual;
              clasepasada.clase =  cursoprogreso.moduloActual.ultimaclase.clase;
              await this._clasePasadaRepository.save(clasepasada);
              cursoprogreso.moduloActual.ultimaclase.clase = null;
              cursoprogreso.moduloActual.ultimaclase.examenModulo =
                cursoprogreso.moduloActual.modulo.examen;
              await this._ultimaClaseRepository.save(
                cursoprogreso.moduloActual.ultimaclase,
              );
            }
          } else {
            let siguienteclasemodulo = new Clase();
            try {
              siguienteclasemodulo = await this._claseRepository
                .createQueryBuilder('clase')
                .orderBy('clase.numeroclase', 'ASC')
                .innerJoin('clase.modulo', 'modulo')
                .orderBy('modulo.numeromodulo', 'ASC')
                .innerJoin('modulo.curso', 'curso')
                .where('modulo.numeromodulo > :numeromodulo', {
                  numeromodulo: cursoprogreso.moduloActual.modulo.numeromodulo,
                })
                .getOne();
            } catch (e) {
              console.log(e);
            }
            if (!clasepasada) {
              if (siguienteclasemodulo) {
                const clasepasada = new ClasePasada();
                clasepasada.moduloActual = cursoprogreso.moduloActual;
                clasepasada.clase = cursoprogreso.moduloActual.ultimaclase.clase;
                await this._clasePasadaRepository.save(clasepasada);
                cursoprogreso.moduloActual.ultimaclase.clase = siguienteclasemodulo;

                await this._ultimaClaseRepository.save(
                  cursoprogreso.moduloActual.ultimaclase,
                );
              } else {
                /* const clasepasada = new ClasePasada();
                clasepasada.moduloActual = cursoprogreso.moduloActual;
                clasepasada.clase = ultimaclase.clase;
                await this._clasePasadaRepository.save(clasepasada);
                 ultimaclase.clase = null;
                ultimaclase.clase = siguienteclasemodulo;
                await this._ultimaClaseRepository.save(ultimaclase);
                */
              }
            }
          }
        }
      }

      //throw new BadRequestException(siguienteclase);
    }
    return nota;
  }

  async totalPreguntasHtmlPorClase(
    cursoProgresoPreguntaHtmlDto,
  ): Promise<number> {
    const actividades = await this._preguntaHtmlRepository
      .createQueryBuilder('preguntas')
      .innerJoin('preguntas.actividad', 'actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.cursosprogreso', 'cursosprogreso')
      .where('cursosprogreso.id = :idcursosprogreso', {
        idcursosprogreso: cursoProgresoPreguntaHtmlDto.id,
      })
      .andWhere('clase.id= :idclase', {
        idclase: cursoProgresoPreguntaHtmlDto.idclase,
      })
      .getCount();
    return actividades;
  }
}
