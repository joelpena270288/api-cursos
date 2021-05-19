import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadService } from './actividad.service';
import { ActividadRepository } from './actividad.repository';
import { VideoRepository } from '../video/video.repository';
import { ClaseRepository } from '../clase/clase.repository';
import { DocumentoRepository } from '../documento/documento.repository';
import { ContenidoRepository } from '../contenido/contenido.repository';
import { ActividadController } from './actividad.controller';
import { AuthModule } from '../auth/auth.module';
import { DashboardRepository } from '../dashboard/dashboard.repository';
import { UserRepository } from '../user/user.repository';
import { PreguntaHtmlRepository } from '../pregunta-html/pregunta_html.repository';
import { ActividadExtraclaseRepository } from '../actividad-extraclase/actividadextraclase.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VideoRepository,
      ClaseRepository,
      DashboardRepository,
      ActividadRepository,
      DocumentoRepository,
      ContenidoRepository,
      UserRepository,
      PreguntaHtmlRepository,
      ActividadExtraclaseRepository,
    ]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
  providers: [ActividadService],
  controllers: [ActividadController],
})
export class ActividadModule {}
