import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Curso} from '../curso/curso.entity';
import{Clase} from '../clase/clase.entity';
import { ClaseService } from "../clase/clase.service";
@Entity('modulos')
export class Modulo extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    nombre:string;
    @Column()
    descripcion: string;
    @Column()
    nota: number;
    @Column({type: 'varchar',default: 'ACTIVE', length: 8})
    status: string;
     @ManyToOne(type => Curso, cursos => cursos.modulos,{eager:false})
    @JoinColumn([{ name: "curso_Id", referencedColumnName: "id" }])
    @Column()
     curso_Id: number; 
     curso: Curso;
     @OneToMany(type=> Clase, clase=>clase.modulo,{eager:true})
     clases: Clase[]; 
    @CreateDateColumn({type:'timestamp',name: 'created_at'})
    createdAt:Date;
    @CreateDateColumn({type:'timestamp', name: 'updated_at'})
    updatedAt:Date;
    


    
}