import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/user.decorator';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { User } from '../user/user.entity';
import { ExamenModuloService } from './examen-modulo.service';
import { ExmanenModuloInDto } from './dto/examen-modulo-in.dto';
@Controller('examenModulo')
export class ExamenModuloController {
  constructor(private readonly examenModuloService: ExamenModuloService) {}
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get('/getbyIdModulo/:idmodulo')
  getById(
    @Param('idmodulo', ParseUUIDPipe) idmodulo: string,
    @GetUser() user: User,
  ) {
    return this.examenModuloService.getExamen(idmodulo, user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  postEvaluar(@Body() enviarexamen: ExmanenModuloInDto, @GetUser() user: User) {
    return this.examenModuloService.evaluarExamen(enviarexamen, user);
  }
}
