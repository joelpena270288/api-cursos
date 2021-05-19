import { TipoPreguntaService } from './tipo-pregunta.service';
import { TipoPreguntaController } from './tipo-pregunta.controller';
import { Module } from '@nestjs/common';
import { TipoPreguntaRepository } from './tipo-pregunta.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TipoPreguntaRepository]), AuthModule],
  controllers: [TipoPreguntaController],
  providers: [TipoPreguntaService],
})
export class TipoPreguntaModule {}
