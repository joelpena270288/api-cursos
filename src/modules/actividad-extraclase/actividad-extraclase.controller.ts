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
import { ActividadExtraclaseService } from './actividad-extraclase.service';
import { ActividadesExtraclase } from './actividadextraclase.entity';

@Controller('actividad-extraclase')
export class ActividadExtraclaseController {
  constructor(
    private readonly _actvidadextraclaseService: ActividadExtraclaseService,
  ) {}
  @Post()
  createActvidadExtraclase(
    @Body() actvidadextraclase: ActividadesExtraclase,
  ): Promise<ActividadesExtraclase> {
    return this._actvidadextraclaseService.create(actvidadextraclase);
  }
  @Get('/byidactividad/:idactividad')
  getAllModuloByIdCurso(
    @Param('idactividad', ParseIntPipe) idactividad: number,
  ): Promise<ActividadesExtraclase[]> {
    return this._actvidadextraclaseService.getAllByIdClase(idactividad);
  }
}
