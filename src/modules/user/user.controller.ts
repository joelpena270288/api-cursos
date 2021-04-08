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
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { ReadUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { UserDetails } from './user.details.entity';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Get(':userId')
  getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto> {
    return this._userService.get(userId);
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

  @Patch('adddetail/:userId')
  updatedetailsUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() detail: UserDetails,
  ) {
    return this._userService.adddetail(userId, detail);
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
}
