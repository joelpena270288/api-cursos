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
  import { ContenidoService } from './contenido.service';
  import { Contenido } from './contenido.entity';
@Controller('contenido')
export class ContenidoController {
    constructor(private readonly _contenidoService: ContenidoService) {}
  @Post()
  create(@Body() contenido: Contenido): Promise<Contenido> {
    return this._contenidoService.create(contenido);
  }
  @Get('/byidactividad/:idactividad')
  getAllModuloByIdClase(
    @Param('idactividad', ParseIntPipe) idactividad: number,
  ): Promise<Contenido[]> {
    return this._contenidoService.getAllByIdClase(idactividad);
  }
}
