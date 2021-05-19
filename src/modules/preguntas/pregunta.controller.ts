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
import { RoleType } from '../role/roletype.enum';
import { Roles } from '../role/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/user.decorator';
import { PreguntaService } from './pregunta.service';
import { Pregunta } from './pregunta.entity';

@Controller('pregunta')
export class PreguntaController {
  constructor(private readonly _preguntaService: PreguntaService) {}
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post(':idpregunta')
  create(
    @Param('idpregunta', ParseUUIDPipe) idpregunta: string,
    @Body() pregunta: Pregunta,
    @GetUser() user: User,
  ) {
    return this._preguntaService.create(idpregunta, pregunta, user);
  }

  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get(':idpregunta')
  getAllPreguntaByIdPreguntaChecked(
    @Param('idpregunta', ParseUUIDPipe) idpregunta: string,
    @GetUser() user: User,
  ) {
    return this._preguntaService.getAllByIdPreguntaChecked(idpregunta, user);
  }
}
