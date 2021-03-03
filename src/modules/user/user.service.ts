import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import { UserRepository } from './user.repository';
import { RoleRepository } from '../role/role.repository';
import {status} from '../../shared/entity-status.enum';
import {ReadUserDto, UpdateUserDto } from './dto';
import { plainToClass } from 'class-transformer';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly  _userRepository: UserRepository,
        @InjectRepository(RoleRepository)
        private readonly  _roleRepository: RoleRepository,
       
    ){}
    async get(id: number): Promise<ReadUserDto>{
        if(!id){
          throw new BadRequestException("id must be sent");  
        }
        const user: User = await this._userRepository.findOne(id,{
           where: {status: status.ACTIVE},
         });
         if(!user){
           throw new NotFoundException();  
         }
         return plainToClass(ReadUserDto,user);

    }
    async getAll(): Promise<ReadUserDto[]>{
       
        const users: User[] = await this._userRepository.find({
           where: {status: status.ACTIVE},
         });
        
         return users.map((user: User)=>plainToClass(ReadUserDto,user));

    }
   
    async update(userid: number, user: UpdateUserDto): Promise<ReadUserDto>{
     
      const founduser = await this._userRepository.findOne(userid, {where:{status: "ACTIVE"}});
      if(!founduser){
        throw new NotFoundException("user not exist");
      }
      founduser.username = user.username;
      founduser.email = user.email;
      const updateduser = await this._userRepository.save(founduser);  
      return plainToClass(ReadUserDto,updateduser);  
    }
    async delete(userId: number): Promise<boolean>{
      const userExist = await this._userRepository.findOne(userId,{where: {status: 'ACTIVE'}});
      if(!userExist){
        throw new NotFoundException('User does not exist');
      }
      await this._userRepository.update(userId, {status: status.INACTIVE});
      return true;
    }
    async setRoleToUser(userId: number, roleId: number): Promise<boolean>{
      const userExist = await this._userRepository.findOne(userId,{
        where: {status: status.ACTIVE},
      });
      if(!userExist){
        throw new NotFoundException("Usuario no existe");
      }
     const roleExist = await this._roleRepository.findOne(roleId, {
       where: {status: status.ACTIVE},
     });
     if(!roleExist){
       throw new NotFoundException('Role does not exist');
     }
     userExist.roles.push(roleExist);
     await this._userRepository.save(userExist);
     return true;
    }
   
}
