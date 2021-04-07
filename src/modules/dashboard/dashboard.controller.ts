import { Controller, Get } from '@nestjs/common';
import { GetUser } from '../auth/user.decorator';
import { User } from '../user/user.entity';
import { Dashboard } from './dashboard.entity';
import { DashboardService } from './dashboard.service';

@Controller()
export class DashboardController {
  constructor(private readonly _dashboardService: DashboardService) {}
  @Get()
  getDashboard(@GetUser() user: User): Promise<Dashboard> {
    return this._dashboardService.get(user);
  }
}
