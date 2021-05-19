import {
  BaseEntity,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { PreguntaValueVoF } from '../preguntas-valueVoF/pregunta-valueVoF.entity';


@Entity('preguntas-vf')
export class PreguntaVf extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToMany(
    () => PreguntaValueVoF,
    (preguntaValue) => preguntaValue.preguntavf,
  )
  preguntasValue: PreguntaValueVoF[];

 
}
