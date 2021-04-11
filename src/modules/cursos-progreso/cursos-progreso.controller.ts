import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/user.decorator';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { User } from '../user/user.entity';
import { CursosProgreso } from './cursos-progreso.entity';
import { CursosProgresoService } from './cursos-progreso.service';

@Controller('cursoprogreso')
export class CursosProgresoController {
  constructor(private readonly _cursoProgresoService: CursosProgresoService) {}
  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.DOCENTE)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  createCurso(
    @Body() id: number,
    @GetUser() user: User,
  ): Promise<CursosProgreso> {
    return this._cursoProgresoService.create(id, user);
  }
}
