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
import { ActividadService } from './actividad.service';
import { Actividad } from './actividad.entity';

@Controller('actividad')
export class ActividadController {
  constructor(private readonly _actividadService: ActividadService) {}
  @Get(':actividadid')
  getActividad(
    @Param('actividadid', ParseIntPipe) actividadid: number,
  ): Promise<Actividad> {
    return this._actividadService.get(actividadid);
  }
  @Get()
  getAllActividad(): Promise<Actividad[]> {
    return this._actividadService.getAll();
  }
  @Post()
  createActividad(@Body() actividad: Actividad): Promise<Actividad> {
    return this._actividadService.create(actividad);
  }
  @Patch(':actividadid')
  updateactividad(
    @Param('actividadid', ParseIntPipe) actividadid: number,
    @Body() actividad: Actividad,
  ) {
    return this._actividadService.update(actividadid, actividad);
  }
  @Delete(':actividadid')
  deleteActividad(@Param('actividadid', ParseIntPipe) actividadid: number) {
    return this._actividadService.delete(actividadid);
  }
}
