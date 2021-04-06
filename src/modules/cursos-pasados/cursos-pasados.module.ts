import { CursosPasadosService } from './cursos-pasados.service';
import { CursosPasadosController } from './cursos-pasados.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        CursosPasadosController,],
    providers: [
        CursosPasadosService,],
})
export class CursosPasadosModule { }
