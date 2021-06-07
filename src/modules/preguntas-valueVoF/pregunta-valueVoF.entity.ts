import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PreguntaVf } from '../pregunta-vf/pregunta-vf.entity';
import { PreguntaMultiselected } from '../pregunta-multiselected/pregunta-multiselected.entity';

@Entity('preguntas-valueVoF')
export class PreguntaValueVoF extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  pregunta: string;
  @Column()
  respuesta: boolean;
  @Column({ default: 0 })
  puntos: number;
  @ManyToOne(() => PreguntaVf, (preguntaVf) => preguntaVf.preguntasValue, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  preguntavf: PreguntaVf;

  @ManyToOne(
    () => PreguntaMultiselected,
    (preguntaMultiselected) => preguntaMultiselected.preguntasvaluesVoF,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  preguntaMultiselected: PreguntaMultiselected;
}
