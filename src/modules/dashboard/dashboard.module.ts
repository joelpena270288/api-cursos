import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardRepository } from './dashboard.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DashboardRepository])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
