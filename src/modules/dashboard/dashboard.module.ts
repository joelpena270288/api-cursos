import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        DashboardController,],
    providers: [
        DashboardService,],
})
export class DashboardModule { }
