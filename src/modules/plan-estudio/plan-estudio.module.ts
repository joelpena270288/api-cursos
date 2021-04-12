import { PlanEstudioService } from './plan-estudio.service';
import { PlanEstudioController } from './plan-estudio.controller';
import { Module } from '@nestjs/common';
import { DashboardRepository } from '../dashboard/dashboard.repository';
import { UserRepository } from '../user/user.repository';
import { RoleRepository } from '../role/role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

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
  controllers: [PlanEstudioController],
  providers: [PlanEstudioService],
})
export class PlanEstudioModule {}
