import { from } from "rxjs";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Evaluacion} from '../evaluacion/evaluacion.entity';


@Entity('actividades_entraclases')
export class ActividadesExtraclase extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    punto: number;
    @Column()
    orientacion: string;   
    @Column()
    documentos:string;
    @Column()
    fecha_orientacion:Date;
    @Column()
    fecha_entrega:Date;
    @CreateDateColumn({type:'timestamp',name: 'created_at'})
    createdAt:Date;
    @CreateDateColumn({type:'timestamp', name: 'updated_at'})
    updatedAt:Date;
    @ManyToOne(type => Evaluacion, evaluaciones => evaluaciones.actividades_extraclases,{eager:false})
    @JoinColumn([{ name: "evalucacion_Id", referencedColumnName: "id" }])
    @Column()
    evaluacion_Id: number;  
     evaluacion: Evaluacion; 
     

}