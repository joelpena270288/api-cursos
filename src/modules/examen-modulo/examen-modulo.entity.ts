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
import { Modulo } from '../modulo/modulo.entity';

import { PreguntaChecked } from '../pregunta-cheked/pregunta-checked.entity';
import { PreguntaComplete } from '../pregunta-complete/pregunta-complete.entity';
import { PreguntaMultiselected } from '../pregunta-multiselected/pregunta-multiselected.entity';
import { PreguntaVf } from '../pregunta-vf/pregunta-vf.entity';
import { PreguntaModulo } from '../pregunta-modulo/pregunta-modulo.entity';
@Entity('examen-modulo')
export class ExamenModulo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @OneToMany(
    (type) => PreguntaModulo,
    (preguntaModulo) => preguntaModulo.examenModulo,
  )
  preguntasModulo: PreguntaModulo[];
}
