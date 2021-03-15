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
import { PreguntaHtmlService } from './pregunta-html.service';
import { PreguntaHtml } from './preguntahtml.entity';

@Controller('pregunta-html')
export class PreguntaHtmlController {
  constructor(private readonly _preguntahtmlService: PreguntaHtmlService) {}
  @Post()
  createPreguntaHtml(
    @Body() preguntahtml: PreguntaHtml,
  ): Promise<PreguntaHtml> {
    return this._preguntahtmlService.create(preguntahtml);
  }
  @Get('/byidactividad/:idactividad')
  getAllModuloByIdCurso(
    @Param('idactividad', ParseIntPipe) idactividad: number,
  ): Promise<PreguntaHtml[]> {
    return this._preguntahtmlService.getAllByIdClase(idactividad);
  }
}
