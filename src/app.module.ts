
import { ModuloActualModule } from './modules/modulo-actual/modulo-actual.module';
import { ModulosPasadosModule } from './modules/modulos-pasados/modulos-pasados.module';
import { PreguntaModuloModule } from './modules/pregunta-modulo/pregunta-modulo.module';
import { PreguntaVfModule } from './modules/pregunta-vf/pregunta-vf.module';
import { TipoPreguntaModule } from './modules/tipo-pregunta/tipo-pregunta.module';
import { ExamenFinalModule } from './modules/examen-final-curso/examen-final.module';
import { PalabraOrdenModule } from './modules/palabra-orden/palabra-orden.module';
import { PreguntaValueModule } from './modules/preguntas-valueVoF/pregunta-valueVoF.module';
import { PreguntaModule } from './modules/preguntas/pregunta.module';

import { PreguntaMultiselectedModule } from './modules/pregunta-multiselected/pregunta-multiselected.module';
import { PreguntaCompleteModule } from './modules/pregunta-complete/pregunta-complete.module';
import { PreguntaCheckedModule } from './modules/pregunta-cheked/pregunta-checked.module';

import { ExamenModuloModule } from './modules/examen-modulo/examen-modulo.module';
import { UltimaClaseModule } from './modules/ultima-clase/ultima-clase.module';
import { ClasePasadaModule } from './modules/clases-pasadas/clase-pasada.module';

import { PlanModule } from './modules/plan/plan.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CursosProgresoModule } from './modules/cursos-progreso/cursos-progreso.module';

import { PlanEstudioModule } from './modules/plan-estudio/plan-estudio.module';
import { Module } from '@nestjs/common';
import { Configuration } from './config/config.keys';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { CursoModule } from './modules/curso/curso.module';
import { ConfigModule } from './config/config.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { ModuloModule } from './modules/modulo/modulo.module';
import { ClaseModule } from './modules/clase/clase.module';
import { ActividadModule } from './modules/actividad/actividad.module';
import { VideoModule } from './modules/video/video.module';
import { DocumentoModule } from './modules/documento/documento.module';
import { ContenidoModule } from './modules/contenido/contenido.module';
import { PreguntaHtmlModule } from './modules/pregunta-html/pregunta-html.module';
import { ActividadExtraclaseModule } from './modules/actividad-extraclase/actividad-extraclase.module';
import { NotaModule } from './modules/nota/nota.module';
@Module({
  imports: [
    ModuloActualModule,
    ModulosPasadosModule,
    PreguntaModuloModule,
    PreguntaVfModule,
    TipoPreguntaModule,
    ExamenFinalModule,
    PalabraOrdenModule,
    PreguntaValueModule,
    PreguntaModule,
    PreguntaVfModule,
    PreguntaMultiselectedModule,
    PreguntaCompleteModule,
    PreguntaCheckedModule,

    ExamenModuloModule,
    UltimaClaseModule,
    ClasePasadaModule,
    PlanModule,
    DashboardModule,
    CursosProgresoModule,
    PlanEstudioModule,
    DatabaseModule,
    UserModule,
    CursoModule,
    ConfigModule,
    RoleModule,
    AuthModule,
    ModuloModule,
    ClaseModule,
    ActividadModule,
    VideoModule,
    DocumentoModule,
    ContenidoModule,

    PreguntaHtmlModule,
    ActividadExtraclaseModule,
    NotaModule,
  ],
  controllers: [
   ],
  providers: [
    ],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
