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
import { ModuloService } from './modulo.service';
import { Modulo } from './modulo.entity';
import { RoleType } from '../role/roletype.enum';
import { Roles } from '../role/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/user.decorator';
@Controller('modulo')
export class ModuloController {
  constructor(private readonly _moduloService: ModuloService) {}
  /* @Get(':moduloid')
  getModulo(@Param('moduloid', ParseIntPipe) cursoid: number): Promise<Modulo> {
    return this._moduloService.get(cursoid);
  }
  @Get()
  getAllModulo(): Promise<Modulo[]> {
    return this._moduloService.getAll();
  }*/
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get('/byidcurso/:idcurso')
  getAllModuloByIdCurso(
    @Param('idcurso', ParseUUIDPipe) idcurso: string,
    @GetUser() user: User,
  ): Promise<Modulo[]> {
    return this._moduloService.getAllByIdCurso(idcurso, user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  createModulo(@Body() modulo: Modulo, @GetUser() user: User): Promise<Modulo> {
    return this._moduloService.create(modulo, user);
  } /*
  @Patch(':moduloid')
  updateModulo(
    @Param('moduloid', ParseIntPipe) moduloid: number,
    @Body() modulo: Modulo,
  ) {
    return this._moduloService.update(moduloid, modulo);
  }*/
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete(':moduloid')
  deleteModulo(
    @Param('moduloid', ParseUUIDPipe) moduloid: string,
    @GetUser() user: User,
  ) {
    return this._moduloService.delete(moduloid, user);
  }
}
