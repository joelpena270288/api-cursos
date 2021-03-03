import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Actividades} from  '../actividad/actividad.entity';


@Entity('documentos')
export class Documento extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    nombre: string;
    @Column()
    enlace: string;
    @Column()
    nivel:number;   
    @CreateDateColumn({type:'timestamp',name: 'created_at'})
    createdAt:Date;
    @CreateDateColumn({type:'timestamp', name: 'updated_at'})
    updatedAt:Date;
      @ManyToOne(type => Actividades, actividades => actividades.documentos,{eager:false})
    @JoinColumn([{ name: "actividad_Id", referencedColumnName: "id" }])
    @Column()
     actividad_Id: number; 

     actividad: Actividades; 
}