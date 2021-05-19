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
import { PreguntaComplete } from '../pregunta-complete/pregunta-complete.entity';
@Entity('palabras-orden')
export class PalabraOrden extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  palabra: string;
  @Column()
  orden: number;
  @ManyToOne(
    () => PreguntaComplete,
    (preguntaComplete) => preguntaComplete.palabras,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  preguntaComplete: PreguntaComplete;
}
