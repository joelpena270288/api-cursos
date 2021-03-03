import { genSalt, hash } from "bcryptjs";
import { EntityRepository, getConnection, Repository } from "typeorm";
import { Role } from "../role/role.entity";
import { RoleRepository } from "../role/role.repository";
import { RoleType } from "../role/roletype.enum";
import { UserDetails } from "../user/user.details.entity";
import { User } from "../user/user.entity";
import { SignupDto } from "./dto";
@EntityRepository(User)
export class AuthRepository extends Repository<User>{

    async signup(sigupDto: SignupDto){
        const {username, email, password} = sigupDto;
        const user = new User();
        user.username= username;
        user.email= email;
        const rolerepository: RoleRepository = await getConnection().getRepository(Role,);
        const defaultRole: Role = await rolerepository.findOne({where:{name: RoleType.GENERAL}})
        user.roles= [defaultRole];
        const detail = new UserDetails();
        user.details = detail;
        const salt = await genSalt(10);
        user.password = await hash(password, salt);
         await user.save();
        
    }
}