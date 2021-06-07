import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pregunta } from '../preguntas/pregunta.entity';

@Entity('preguntas-checked')
export class PreguntaChecked extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 @Column({default: 0})
 puntos: number;
  @OneToOne((type) => Pregunta,)
  @JoinColumn() 
  pregunta_correcta: Pregunta;
  
  @OneToMany((type) => Pregunta, (pregunta) => pregunta.preguntaChecked, )
  preguntas: Pregunta[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;

 
}
