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
import { DocumentoService } from './documento.service';
import { Documento } from './documento.entity';

@Controller('documento')
export class DocumentoController {
    constructor(private readonly _documentoService: DocumentoService) {}
    @Post()
    createDocumento(@Body() documento: Documento): Promise<Documento> {
      return this._documentoService.create(documento);
    }
    @Get('/byidactividad/:idactividad')
  getAllModuloByIdCurso(
    @Param('idactividad', ParseIntPipe) idactividad: number,
  ): Promise<Documento[]> {
    return this._documentoService.getAllByIdClase(idactividad);
  }
}
