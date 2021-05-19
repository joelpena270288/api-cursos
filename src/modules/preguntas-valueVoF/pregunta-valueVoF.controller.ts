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
import { PreguntaValueService } from './pregunta-valueVoF.service';
import { PreguntaValueVoF } from './pregunta-valueVoF.entity';

@Controller('preguntavalueVoF')
export class PreguntaValueController {
  constructor(private readonly _preguntaValueService: PreguntaValueService) {}
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post(':idpregunta')
  create(
    @Param('idpregunta', ParseUUIDPipe) idpregunta: string,
    @Body() pregunta: PreguntaValueVoF,
    @GetUser() user: User,
  ) {
    return this._preguntaValueService.create(idpregunta, pregunta, user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post('/preguntamultiselected/:idpregunta')
  createMultiselected(
    @Param('idpregunta', ParseUUIDPipe) idpregunta: string,
    @Body() pregunta: PreguntaValueVoF,
    @GetUser() user: User,
  ) {
    return this._preguntaValueService.createMultiselected(
      idpregunta,
      pregunta,
      user,
    );
  }
}
