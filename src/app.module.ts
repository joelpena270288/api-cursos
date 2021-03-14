import { Module } from '@nestjs/common';
import { Configuration } from './config/config.keys';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { CursoModule } from './modules/curso/curso.module';
import { ConfigModule } from './config/config.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { EstadoCursoModule } from './modules/estado-curso/estado-curso.module';
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
     DatabaseModule, 
     UserModule, 
     CursoModule, 
     ConfigModule, 
     RoleModule,    
     AuthModule,
     EstadoCursoModule,
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
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService){
    AppModule.port = this._configService.get(Configuration.PORT);
    
  }
}
