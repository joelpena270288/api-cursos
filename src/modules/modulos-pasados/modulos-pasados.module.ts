import { ModulosPasadosService } from './modulos-pasados.service';
import { ModulosPasadosController } from './modulos-pasados.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        ModulosPasadosController,],
    providers: [
        ModulosPasadosService,],
})
export class ModulosPasadosModule { }
