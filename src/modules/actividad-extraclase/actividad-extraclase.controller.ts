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
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/user.decorator';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { User } from '../user/user.entity';
import { ActividadExtraclaseService } from './actividad-extraclase.service';
import { ActividadesExtraclase } from './actividadextraclase.entity';

@Controller('actividad-extraclase')
export class ActividadExtraclaseController {
  constructor(
    private readonly _actvidadextraclaseService: ActividadExtraclaseService,
  ) {}

  @Get('/byidactividad/:idactividad')
  getAllModuloByIdCurso(
    @Param('idactividad', ParseUUIDPipe) idactividad: string,
  ): Promise<ActividadesExtraclase[]> {
    return this._actvidadextraclaseService.getAllByIdClase(idactividad);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Patch(':idactividad')
  updateHomework(
    @Param('idactividad', ParseUUIDPipe) idactividad: string,
    @Body() actividadextra: ActividadesExtraclase,
    @GetUser() user: User,
  ) {
    return this._actvidadextraclaseService.update(
      idactividad,
      actividadextra,
      user,
    );
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete(':idactividad')
  deleteActividad(
    @Param('idactividad', ParseUUIDPipe) idactividad: string,
    @GetUser() user: User,
  ) {
    return this._actvidadextraclaseService.delete(idactividad, user);
  }
}
