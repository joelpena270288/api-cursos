import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Modulo} from '../modulo/modulo.entity';
import {Actividades} from '../actividad/actividad.entity';
@Entity('clases')
export class Clase extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    nombre:string;
    @Column()
    descripcion: string;
    @Column()
    nota: number;
    @Column()
    fecha_inicio:Date;
  
      @ManyToOne(type => Modulo, modulo => modulo.clases,{eager:false})
    @JoinColumn([{ name: "modulo_Id", referencedColumnName: "id" }])
    @Column()
     modulo_Id: number; 
     modulo:Modulo;
      @OneToMany(type=> Actividades, actividad=>actividad.clase,{eager:false})
      actividades: Actividades[];  
    @CreateDateColumn({type:'timestamp',name: 'created_at'})
    createdAt:Date;
    @CreateDateColumn({type:'timestamp', name: 'updated_at'})
    updatedAt:Date;
}