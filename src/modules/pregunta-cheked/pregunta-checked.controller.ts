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
import { AddpreguntaCheckedDto } from './dto/addpreguntaChecked.dto';
import { PreguntaCheckedService } from './pregunta-checked.service';
import { PreguntaChecked } from './pregunta-checked.entity';
@Controller('preguntachecked')
export class PreguntaCheckedController {
  constructor(
    private readonly _preguntaCheckedService: PreguntaCheckedService,
  ) {}
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  create(
    @Body() addpreguntaCheckedDto: AddpreguntaCheckedDto,

    @GetUser() user: User,
  ) {
    return this._preguntaCheckedService.create(addpreguntaCheckedDto, user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Patch()
  update(@Body() preguntaChecked: PreguntaChecked, @GetUser() user: User) {
    return this._preguntaCheckedService.update(preguntaChecked, user);
  }
}
