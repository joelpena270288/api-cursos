import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "../curso/curso.entity";
import {User} from '../user/user.entity'
@Entity('estado_cursos')
export class EstadoCurso extends BaseEntity{
@PrimaryGeneratedColumn('increment')
id: number;
@Column()
ultima_clase: number;
@Column()
ultima_seccion: number;
@ManyToOne(type => User, user => user.estadocursos,{ eager: false })
@JoinColumn([{ name: "user_Id", referencedColumnName: "id" }])
@Column()
user_Id: number;
user: User;
@Column()
status: string;
@OneToOne(type=>Curso, curso =>curso.id)
@JoinColumn({name: 'curso_id'})

@CreateDateColumn({type:'timestamp',name: 'created_at'})
createdAt:Date;
@CreateDateColumn({type:'timestamp', name: 'updated_at'})
updatedAt:Date;

}