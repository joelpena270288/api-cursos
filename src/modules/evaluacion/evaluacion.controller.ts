import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
  } from '@nestjs/common';
  import {EvaluacionService } from './evaluacion.service';
import { Evaluacion } from './evaluacion.entity';

@Controller('evaluacion')
export class EvaluacionController {
    constructor(private readonly _evaluacionService: EvaluacionService) {}
    @Post()
    createEvaluacion(@Body() evaluacion: Evaluacion): Promise<Evaluacion> {
      return this._evaluacionService.create(evaluacion);
    }
    @Get('/byidactividad/:idactividad')
  getAllModuloByIdCurso(
    @Param('idactividad', ParseIntPipe) idactividad: number,
  ): Promise<Evaluacion[]> {
    return this._evaluacionService.getAllByIdClase(idactividad);
  }
}
