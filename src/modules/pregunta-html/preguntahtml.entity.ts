import { from } from "rxjs";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Evaluacion} from '../evaluacion/evaluacion.entity';


@Entity('preguntas_html')
export class PreguntaHtml extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    punto: number;
    @Column()
    pregunta: string;   
    @Column()
    respuesta:boolean;
    @CreateDateColumn({type:'timestamp',name: 'created_at'})
    createdAt:Date;
    @CreateDateColumn({type:'timestamp', name: 'updated_at'})
    updatedAt:Date;
    
    @ManyToOne(type => Evaluacion, evaluaciones => evaluaciones.preguntas_html,{eager:false})
    @JoinColumn([{ name: "evaluacion_Id", referencedColumnName: "id" }])
    @Column()
     evaluacion_Id: number; 
     evaluacion: Evaluacion; 
     

}