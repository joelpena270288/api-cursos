import{ BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, OneToMany} from 'typeorm';
import { Role } from '../role/role.entity';
import { UserDetails } from './user.details.entity';
import { EstadoCurso } from "../estado-curso/estado_curso.entity";
import { Nota } from "../nota/nota.entity";


@Entity('users')
export class User extends BaseEntity {
@PrimaryGeneratedColumn('increment')
id: number;

@Column({type: 'varchar',unique:true,length: 25, nullable:false})
username: string;

@Column({type:'varchar',nullable: false})
email: string;

@Column({type:'varchar', nullable: false})
password: string;
@OneToOne(type=>UserDetails, {
    cascade: true, 
    nullable:false, 
    eager:true
})
@JoinColumn({name: 'detail_id'})
details: UserDetails;
@ManyToMany(type=> Role, role=>role.users,{eager:true})
@JoinTable({name:'user_roles'})
roles: Role[];  
@OneToMany(type=> EstadoCurso, estadocurso=> estadocurso.user,{eager:false})
estadocursos: EstadoCurso[];
@OneToMany(type=> Nota, nota=> nota.user,{eager:false})
notas: Nota[];
@Column({type: 'varchar',default: 'ACTIVE', length: 8})
status: string;
@CreateDateColumn({type:'timestamp',name: 'created_at'})
createdAt:Date;
@CreateDateColumn({type:'timestamp', name: 'updated_at'})
updatedAt:Date;
}