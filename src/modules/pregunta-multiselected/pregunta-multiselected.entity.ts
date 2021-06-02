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
import { PreguntaValueVoF } from '../preguntas-valueVoF/pregunta-valueVoF.entity';

@Entity('preguntas-multiselected')
export class PreguntaMultiselected extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    (type) => PreguntaValueVoF,
    (preguntaVof) => preguntaVof.preguntaMultiselected,
  )
  preguntasvaluesVoF: PreguntaValueVoF[];
  
}
