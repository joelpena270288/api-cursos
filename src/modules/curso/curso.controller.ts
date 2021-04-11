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
    @Param('cursoid', ParseIntPipe) cursoid: number,
    @Body() role: Curso,
  ) {
    return this._cursoService.update(cursoid, role);
  }
  @Delete(':cursoid')
  deleteRole(@Param('cursoid', ParseIntPipe) cursoid: number) {
    return this._cursoService.delete(cursoid);
  }
  @Get('/getcurso/byuser')
  getCursosByUser(@GetUser() user: User): Promise<Curso[]> {
    return this._cursoService.getAllByUser(user);
  }
}
