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
  ParseUUIDPipe,
} from '@nestjs/common';
import { CursoService } from './curso.service';
import { Curso } from './curso.entity';
import { ReadCursoDto } from './dto/read-curso.dto';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/user.decorator';
import { RoleType } from '../role/roletype.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { Roles } from '../role/decorators/role.decorator';
@Controller('curso')
export class CursoController {
  constructor(private readonly _cursoService: CursoService) {}
  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.GENERAL, RoleType.DOCENTE)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get('/byuser')
  getCurso(@GetUser() user: User): Promise<ReadCursoDto[]> {
    return this._cursoService.get(user.id);
  }
  @Get()
  getAllCurso(): Promise<ReadCursoDto[]> {
    return this._cursoService.getAll();
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  createCurso(@Body() curso: Curso, @GetUser() user: User): Promise<Curso> {
    return this._cursoService.create(curso, user);
  }
  @Patch(':cursoid')
  updateRole(
    @Param('cursoid', ParseUUIDPipe) cursoid: string,
    @Body() role: Curso,
  ) {
    return this._cursoService.update(cursoid, role);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete(':cursoid')
  deleteCurso(
    @Param('cursoid', ParseUUIDPipe) cursoid: string,
    @GetUser() user: User,
  ) {
    return this._cursoService.delete(cursoid, user);
  }
  @Get('/getcurso/byuser')
  getCursosByUser(@GetUser() user: User): Promise<Curso[]> {
    return this._cursoService.getAllByUser(user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post('/cambiarestado')
  disponibleCurso(@Body() curso: Curso, @GetUser() user: User): Promise<Curso> {
    return this._cursoService.cambiarEstado(user, curso.id, curso.disponible);
  }
}
