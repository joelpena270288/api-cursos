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
import { ModuloService } from './modulo.service';
import { Modulo } from './modulo.entity';
@Controller('modulo')
export class ModuloController {
  constructor(private readonly _moduloService: ModuloService) {}
  @Get(':moduloid')
  getModulo(@Param('moduloid', ParseIntPipe) cursoid: number): Promise<Modulo> {
    return this._moduloService.get(cursoid);
  }
  @Get()
  getAllModulo(): Promise<Modulo[]> {
    return this._moduloService.getAll();
  }
  @Get('/byidcurso/:idcurso')
  getAllModuloByIdCurso(
    @Param('idcurso', ParseIntPipe) idcurso: number,
  ): Promise<Modulo[]> {
    return this._moduloService.getAllByIdCurso(idcurso);
  }
  @Post()
  createModulo(@Body() modulo: Modulo): Promise<Modulo> {
    return this._moduloService.create(modulo);
  }
  @Patch(':moduloid')
  updateModulo(
    @Param('moduloid', ParseIntPipe) moduloid: number,
    @Body() modulo: Modulo,
  ) {
    return this._moduloService.update(moduloid, modulo);
  }
  @Delete(':moduloid')
  deleteRole(@Param('moduloid', ParseIntPipe) moduloid: number) {
    return this._moduloService.delete(moduloid);
  }
}
