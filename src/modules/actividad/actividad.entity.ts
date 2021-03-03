import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Clase} from '../clase/clase.entity';
import {Video} from '../video/video.entity';
import { Documento } from '../documento/documento.entity';
import {Contenido} from '../contenido/contenido.entity';
import {Evaluacion} from '../evaluacion/evaluacion.entity';

@Entity('actividades')
export class Actividades extends BaseEntity{
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
    @ManyToOne(type => Clase, clase => clase.actividades,{eager:false})
    @JoinColumn([{ name: "clase_Id", referencedColumnName: "id" }])
    @Column()
    clase_Id: number;  
     clase: Clase; 
     @OneToMany(type=> Video, video=>video.actividad,{eager:false})
     videos: Video[];  
     @OneToMany(type=> Documento, documento=>documento.actividad,{eager:false})
     documentos: Documento[]; 
     @OneToMany(type=> Contenido, contenido=>contenido.actividad,{eager:false})
     contenidos: Contenido[];
     @OneToMany(type=> Evaluacion, evaluacion=>evaluacion.actividad,{eager:false})
     evaluaciones: Evaluacion[];

}