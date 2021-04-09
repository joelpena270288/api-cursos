import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { RoleRepository } from '../role/role.repository';
import { DashboardRepository } from '../dashboard/dashboard.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      DashboardRepository,
    ]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
