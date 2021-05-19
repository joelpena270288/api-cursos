import { PreguntaCheckedController } from './pregunta-checked.controller';
import { PreguntaCheckedService } from './pregunta-checked.service';
import { Module } from '@nestjs/common';
import { PreguntaCheckedRepository } from './pregunta-checked.repository';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntaModuloRepository } from '../pregunta-modulo/pregunta-modulo.repository';
import { ModuloRepository } from '../modulo/modulo.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PreguntaCheckedRepository,
      PreguntaModuloRepository,
      ModuloRepository,
    ]),
    AuthModule,
  ],
  controllers: [PreguntaCheckedController],
  providers: [PreguntaCheckedService],
})
export class PreguntaCheckedModule {}
