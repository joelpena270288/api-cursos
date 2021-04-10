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
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { ReadUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { UserDetails } from './user.details.entity';
import { GetUser } from '../auth/user.decorator';
import { User } from './user.entity';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.GENERAL, RoleType.DOCENTE)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get('/mi')
  getUser( @GetUser() user: User): Promise<ReadUserDto> {
    return this._userService.get(user.id);
  }

  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.GENERAL)
  //@UseGuards(AuthGuard(), RoleGuard)
  @Get()
  getUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  @Patch(':userId')
  updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() user: UpdateUserDto,
  ) {
    return this._userService.update(userId, user);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.GENERAL, RoleType.DOCENTE)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post('/adddetail')
  updatedetailsUser(@Body() detail: UserDetails, @GetUser() user: User) {
    return this._userService.adddetail(user, detail);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<boolean> {
    return this._userService.delete(userId);
  }
  @Post('/:userId/:roleId')
  setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<boolean> {
    return this._userService.setRoleToUser(userId, roleId);
  }
  @Post('/upload/photo/byuser')
  guardarFoto(@Req() req: Request) {
    this._userService.GuardarFoto(req);
  }
}
