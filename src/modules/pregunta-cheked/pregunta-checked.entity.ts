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
  @OneToOne((type) => Pregunta,)
  @JoinColumn() 
  pregunta_correcta: Pregunta;
  
  @OneToMany((type) => Pregunta, (pregunta) => pregunta.preguntaChecked, )
  preguntas: Pregunta[];

 
}
