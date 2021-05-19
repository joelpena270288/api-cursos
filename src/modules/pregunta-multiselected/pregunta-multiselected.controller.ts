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
import { PreguntaMultiselectedService } from './pregunta-multiselected.service';
import { AddpreguntaMultiselectedDto } from './dto/addpreguntamultiselected.dto';

@Controller('preguntamultiselected')
export class PreguntaMultiselectedController {
  constructor(
    private readonly _preguntaMultiselectedService: PreguntaMultiselectedService,
  ) {}

  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  create(
    @Body() preguntaDto: AddpreguntaMultiselectedDto,
    @GetUser() user: User,
  ) {
    return this._preguntaMultiselectedService.create(
      preguntaDto.idPreguntaModulo,
      user,
    );
  }

  
}
