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
import { PreguntaModuloService } from './pregunta-modulo.service';
import { AddPreguntaModulodto } from './dto/addPreguntaModulo.dto';

@Controller('preguntaModulo')
export class PreguntaModuloController {
  constructor(private readonly _preguntaModuloService: PreguntaModuloService) {}
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post(':idmodulo')
  create(
    @Param('idmodulo', ParseUUIDPipe) idmodulo: string,
    @Body() pregunta: AddPreguntaModulodto,
    @GetUser() user: User,
  ) {
    return this._preguntaModuloService.create(idmodulo, pregunta, user);
  }
}
