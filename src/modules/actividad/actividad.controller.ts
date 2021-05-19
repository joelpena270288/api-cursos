import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { Actividad } from './actividad.entity';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/user.decorator';

@Controller('actividad')
export class ActividadController {
  constructor(private readonly _actividadService: ActividadService) {}
  @Get(':actividadid')
  getActividad(
    @Param('actividadid', ParseUUIDPipe) actividadid: string,
  ): Promise<Actividad> {
    return this._actividadService.get(actividadid);
  }
  @Get()
  getAllActividad(): Promise<Actividad[]> {
    return this._actividadService.getAll();
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  createActividad(
    @Body() actividad: Actividad,
    @GetUser() user: User,
  ): Promise<Actividad> {
    return this._actividadService.create(actividad, user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Patch(':actividadid')
  updateactividad(
    @Param('actividadid', ParseUUIDPipe) actividadid: string,
    @Body() actividad: Actividad,
    @GetUser() user: User,
  ) {
    return this._actividadService.update(actividadid, actividad, user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete(':actividadid')
  deleteActividad(
    @Param('actividadid', ParseUUIDPipe) actividadid: string,
    @GetUser() user: User,
  ) {
    return this._actividadService.delete(actividadid, user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.DOCENTE)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get('/allbyIdClase/:clasid')
  getAllByIdClase(
    @Param('clasid', ParseUUIDPipe) clasid: string,
    @GetUser() user: User,
  ): Promise<Actividad[]> {
    return this._actividadService.getAllByIdClase(clasid, user);
  }
}
