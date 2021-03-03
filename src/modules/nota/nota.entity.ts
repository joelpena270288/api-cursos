import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import {User} from '../user/user.entity'
import { Actividades } from "../actividad/actividad.entity";
@Entity('notas')
export class Nota extends BaseEntity{
@PrimaryGeneratedColumn('increment')
id: number;
@Column()
nota: number;
ultima_actividad: number;

@ManyToOne(type => User, users => users.notas,{eager:false})
@JoinColumn([{ name: "user_Id", referencedColumnName: "id" }])
@Column()
user_Id: number; 
user: User;
@OneToOne(type=>Actividades, actividades=>actividades.id)
@JoinColumn({name: 'actividad_id'})

@CreateDateColumn({type:'timestamp',name: 'created_at'})
createdAt:Date;
@CreateDateColumn({type:'timestamp', name: 'updated_at'})
updatedAt:Date;

}