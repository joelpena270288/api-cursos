import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entity-status.enum';
import { ReadUserDto, UpdateUserDto, UserDto } from './dto';
import { plainToClass } from 'class-transformer';
import { DashboardRepository } from '../dashboard/dashboard.repository';
import { Dashboard } from '../dashboard/dashboard.entity';
import { UserDetails } from './user.details.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
    @InjectRepository(DashboardRepository)
    private readonly _dasboardRepository: DashboardRepository,
  ) {}
  async get(id: string): Promise<ReadUserDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }
    const user: User = await this._userRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return plainToClass(ReadUserDto, user);
  }
  async getAll(): Promise<ReadUserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: status.ACTIVE },
    });

    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  async update(userid: string, user: UpdateUserDto): Promise<ReadUserDto> {
    const founduser = await this._userRepository.findOne(userid, {
      where: { status: 'ACTIVE' },
    });
    if (!founduser) {
      throw new NotFoundException('user not exist');
    }
    founduser.username = user.username;
    founduser.email = user.email;
    const updateduser = await this._userRepository.save(founduser);

    return plainToClass(ReadUserDto, updateduser);
  }

  async delete(userId: string): Promise<boolean> {
    const userExist = await this._userRepository.findOne(userId, {
      where: { status: 'ACTIVE' },
    });
    if (!userExist) {
      throw new NotFoundException('User does not exist');
    }
    await this._userRepository.update(userId, { status: status.INACTIVE });
    return true;
  }
  async setRoleToUser(userId: string, roleId: string): Promise<boolean> {
    const userExist = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });
    if (!userExist) {
      throw new NotFoundException('Usuario no existe');
    }
    const roleExist = await this._roleRepository.findOne(roleId, {
      where: { status: status.ACTIVE },
    });
    if (!roleExist) {
      throw new NotFoundException('Role does not exist');
    }
    userExist.roles.push(roleExist);
    await this._userRepository.save(userExist);
    return true;
  }
  async adddetail(user: User, userdetail: UserDetails): Promise<ReadUserDto> {
    const founduser = await this._userRepository.findOne(user.id, {
      where: { status: 'ACTIVE' },
    });
    if (!founduser) {
      throw new NotFoundException('user not exist');
    }
    if (userdetail.name !== '') {
      founduser.details.name = userdetail.name;
    }
    if (userdetail.lastname !== '') {
      founduser.details.lastname = userdetail.lastname;
    }
    if (userdetail.sex !== '') {
      founduser.details.sex = userdetail.sex;
    }
    if (userdetail.age !== 0) {
      founduser.details.age = userdetail.age;
    }
    if (userdetail.photo !== '') {
      founduser.details.photo = userdetail.photo;
    }
    if (userdetail.education !== '') {
      founduser.details.education = userdetail.education;
    }
    if (userdetail.intereses !== '') {
      founduser.details.intereses = userdetail.intereses;
    }

    const updateduser = await this._userRepository.save(founduser);
    const dashboard = await this._dasboardRepository.findOne({
      where: { user: founduser },
    });
    if (!dashboard) {
      const dashboard = new Dashboard();
      dashboard.user = founduser;
      await this._dasboardRepository.save(dashboard);
    }

    return plainToClass(ReadUserDto, updateduser);
  }
}
