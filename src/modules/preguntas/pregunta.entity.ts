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
import { PreguntaChecked } from '../pregunta-cheked/pregunta-checked.entity';

@Entity('preguntas')
export class Pregunta extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  pregunta: string;
  @ManyToOne(
    () => PreguntaChecked,
    (preguntaChecked) => preguntaChecked.preguntas,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  preguntaChecked: PreguntaChecked;

  
}
