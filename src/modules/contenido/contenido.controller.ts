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
  import { ContenidoService } from './contenido.service';
  import { Contenido } from './contenido.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleType } from '../role/roletype.enum';
import { Roles } from '../role/decorators/role.decorator';
import { GetUser } from '../auth/user.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { User } from '../user/user.entity';
@Controller('contenido')
export class ContenidoController {
    constructor(private readonly _contenidoService: ContenidoService) {}
  @Post()
  create(@Body() contenido: Contenido): Promise<Contenido> {
    return this._contenidoService.create(contenido);
  }
  @Get('/byidactividad/:idactividad')
  getAllContenidoByIdActividad(
    @Param('idactividad', ParseUUIDPipe) idactividad: string,
  ): Promise<Contenido[]> {
    return this._contenidoService.getAllByIdClase(idactividad);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Patch(':idcontenido')
  updatecontenido(
    @Param('idcontenido', ParseUUIDPipe) idcontenido: string,
    @Body() contenido: Contenido,
    @GetUser() user: User,
  ) {
    return this._contenidoService.update(idcontenido, contenido, user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete(':idcontenido')
  deleteActividad(
    @Param('idcontenido', ParseUUIDPipe) idcontenido: string,
    @GetUser() user: User,
  ) {
    return this._contenidoService.delete(idcontenido, user);
  }
}
