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
import { UltimaClase } from '../ultima-clase/ultima-clase.entity';
import {Curso } from '../curso/curso.entity';
@Entity('examen-final')
export class ExamenFinal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    (type) => PreguntaModulo,
    (preguntaModulo) => preguntaModulo.examenModulo,
  )
  preguntasModulo: PreguntaModulo[];
  @OneToMany((type) => UltimaClase, (ultimaclase) => ultimaclase.examenModulo)
  ultimaclase: UltimaClase[];
  @OneToOne(() => Curso)
  @JoinColumn()
  curso: Curso;
}
