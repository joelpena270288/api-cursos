import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
import { PreguntaVfService } from './pregunta-vf.service';
import { PreguntaVf } from './pregunta-vf.entity';
import { AddpreguntaVoFdto } from './dto/addpreguntaVoF.dto';
@Controller('preguntavof')
export class PreguntaVfController {
  constructor(private readonly preguntaVoFService: PreguntaVfService) {}

  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.DOCENTE)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  create(
    @Body() addpreguntaVoFdto: AddpreguntaVoFdto, 
    
    @GetUser() user: User,
  ) {
    return this.preguntaVoFService.create(addpreguntaVoFdto, user);
  }
}
