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
import { PreguntaHtmlService } from './pregunta-html.service';
import { PreguntaHtml } from './preguntahtml.entity';

@Controller('pregunta-html')
export class PreguntaHtmlController {
  constructor(private readonly _preguntahtmlService: PreguntaHtmlService) {}

  @Get('/byidactividad/:idactividad')
  getAllModuloByIdCurso(
    @Param('idactividad', ParseUUIDPipe) idactividad: string,
  ): Promise<PreguntaHtml[]> {
    return this._preguntahtmlService.getAllByIdClase(idactividad);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Patch(':idpregunta')
  update(
    @Param('idpregunta', ParseUUIDPipe) idpregunta: string,
    @Body() pregunta: PreguntaHtml,
    @GetUser() user: User,
  ) {
    return this._preguntahtmlService.update(idpregunta, pregunta, user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete(':idpregunta')
  deleteActividad(
    @Param('idpregunta', ParseUUIDPipe) idpregunta: string,
    @GetUser() user: User,
  ) {
    return this._preguntahtmlService.delete(idpregunta, user);
  }
}
