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
import { ClaseService } from './clase.service';
import { Clase } from './clase.entity';
import { Roles } from '../role/decorators/role.decorator';
import { RoleType } from '../role/roletype.enum';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/user.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('clase')
export class ClaseController {
  constructor(private readonly _claseService: ClaseService) {}
  /* @Get(':claseid')
  getClase(@Param('claseid', ParseIntPipe) claseid: number): Promise<Clase> {
    return this._claseService.get(claseid);
  }*/
  /*
  @Get()
  getAllClase(): Promise<Clase[]> {
    return this._claseService.getAll();
  }*/
  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.DOCENTE)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  createClase(@Body() clase: Clase, @GetUser() user: User): Promise<Clase> {
    return this._claseService.create(clase, user);
  }
  /*
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Patch(':claseid')
  updateclase(
    @Param('claseid', ParseIntPipe) claseid: number,
    @Body() clase: Clase,
    @GetUser() user: User,
  ) {
    return this._claseService.update(claseid, clase, user);
  }*/
  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.DOCENTE)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete(':claseid')
  deleteClase(
    @Param('claseid', ParseUUIDPipe) claseid: string,
    @GetUser() user: User,
  ) {
    return this._claseService.delete(claseid, user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.DOCENTE)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get('/byidmodulo/:idmodulo')
  getAllClseByIdModulo(
    @Param('idmodulo', ParseUUIDPipe) idmodulo: string,
    @GetUser() user: User,
  ): Promise<Clase[]> {
    return this._claseService.getAllByIdModulo(idmodulo, user);
  }
}
