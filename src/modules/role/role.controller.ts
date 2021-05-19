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
} from '@nestjs/common';
import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from './dtos';

import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}
  @Get(':roleid')
  getRole(@Param('roleid', ParseUUIDPipe) id: string): Promise<ReadRoleDto> {
    return this._roleService.get(id);
  }
  @Get()
  getRoles(): Promise<ReadRoleDto[]> {
    return this._roleService.getAll();
  }
  @Post()
  createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    return this._roleService.create(role);
  }
  @Patch(':roleid')
  updateRole(
    @Param('roleid', ParseUUIDPipe) roleid: string,
    @Body() role: Partial<UpdateRoleDto>,
  ) {
    return this._roleService.update(roleid, role);
  }
  @Delete(':roleid')
  deleteRole(@Param('roleid', ParseUUIDPipe) id: string) {
    return this._roleService.delete(id);
  }
}
