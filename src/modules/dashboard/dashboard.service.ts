import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';
import { User } from '../user/user.entity';
import { Dashboard } from './dashboard.entity';
import { DashboardRepository } from './dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(DashboardRepository)
    private readonly _dashboardRepository: DashboardRepository,
  ) {}
  async get(user: User): Promise<Dashboard> {
    const dashboard: Dashboard = await this._dashboardRepository.findOne({
      where: { status: status.ACTIVE, user: user },
      relations: ['user'],
    });
    if (!dashboard) {
      throw new NotFoundException('this dashborad does not found');
    }
    return dashboard;
  }
}
