import { from } from 'rxjs';
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
import { Actividad } from '../actividad/actividad.entity';

@Entity('preguntas_html')
export class PreguntaHtml extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  punto: number;
  @Column()
  pregunta: string;
  @Column()
  respuesta: boolean;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Actividad, (actividades) => actividades.preguntas_html, {
    cascade: true,
    onDelete: 'CASCADE'
    
  })
  actividad: Actividad;
}
