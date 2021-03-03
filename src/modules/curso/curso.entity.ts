import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Modulo} from '../modulo/modulo.entity';

@Entity('cursos')
export class Curso extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    nombre: string;
    @Column()
    nota: number;
    @Column()
    precio: number;
    @Column()
    descripcion: string;
    @Column()
    fecha_inicio_incripcion: Date;
    @Column()
    fecha_fin_incripcion:Date;
    @CreateDateColumn({type:'timestamp',name: 'created_at'})
    createdAt:Date;
    @CreateDateColumn({type:'timestamp', name: 'updated_at'})
    updatedAt:Date;
    @Column({type: 'varchar',default: 'ACTIVE', length: 8})
    status: string;
    @OneToMany(type=> Modulo, modulo=>modulo.curso,{eager:true})

     modulos: Modulo[];  

}