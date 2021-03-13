import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actividades } from '../actividad/actividad.entity';
import { PreguntaHtml } from '../pregunta-html/preguntahtml.entity';
import { ActividadesExtraclase } from '../actividad-extraclase/actividadextraclase.entity';

@Entity('evaluaciones')
export class Evaluacion extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  nombre: string;
  @Column()
  punto: number;
  @Column()
  descripcion: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  @ManyToOne(() => Actividades, (actividades) => actividades.evaluaciones)
  actividad: Actividades;
  @OneToMany(
    () => PreguntaHtml,
    preguntahtml => preguntahtml.evaluacion,
    
  )
  preguntas_html: PreguntaHtml[];
  @OneToMany(
    () => ActividadesExtraclase,
    actividadextraclase => actividadextraclase.evaluacion
    
  )
  actividades_extraclases: PreguntaHtml[];
}
