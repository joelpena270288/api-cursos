import { ExamenFinalService } from './examen-final.service';
import { ExamenFinalController } from './examen-final.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenFinalRepository } from './examen-final.repository';
import { CursoRepository } from '../curso/curso.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamenFinalRepository, CursoRepository]),
    AuthModule,
  ],
  controllers: [ExamenFinalController],
  providers: [ExamenFinalService],
})
export class ExamenFinalModule {}
