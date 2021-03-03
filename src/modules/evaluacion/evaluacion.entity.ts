import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Actividades} from  '../actividad/actividad.entity';
import { PreguntaHtml } from "../pregunta-html/preguntahtml.entity";
import { ActividadesExtraclase } from "../actividad-extraclase/actividadextraclase.entity";


@Entity('evaluaciones')
export class Evaluacion extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    punto: number;
    @Column()
    descripcion: string;   
    @CreateDateColumn({type:'timestamp',name: 'created_at'})
    createdAt:Date;
    @CreateDateColumn({type:'timestamp', name: 'updated_at'})
    updatedAt:Date;
    @ManyToOne(type => Actividades, actividades => actividades.evaluaciones,{eager:false})
    @JoinColumn([{ name: "actividad_Id", referencedColumnName: "id" }])
    @Column()
    actividad_Id: number; 

     actividad: Actividades; 
     @OneToMany(type=> PreguntaHtml, preguntahtml=>preguntahtml.evaluacion,{eager:true})
     preguntas_html: PreguntaHtml[]; 
     @OneToMany(type=> ActividadesExtraclase, actividadextraclase=>actividadextraclase.evaluacion,{eager:true})
     actividades_extraclases: PreguntaHtml[];

}