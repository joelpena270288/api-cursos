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
import { PreguntaComplete } from '../pregunta-complete/pregunta-complete.entity';
import { PreguntaMultiselected } from '../pregunta-multiselected/pregunta-multiselected.entity';
import { PreguntaVf } from '../pregunta-vf/pregunta-vf.entity';
import { ExamenModulo } from '../examen-modulo/examen-modulo.entity';
@Entity('preguntas-modulos')
export class PreguntaModulo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  numeropregunta: number;
  @Column()
  varlorPregunta: number;

  @OneToOne((type) => PreguntaChecked, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  preguntachecked: PreguntaChecked;

  @OneToOne((type) => PreguntaComplete, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  preguntacomplete: PreguntaComplete;

  @OneToOne((type) => PreguntaMultiselected, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  preguntamultiselected: PreguntaMultiselected;
  @OneToOne((type) => PreguntaVf, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  preguntaVoF: PreguntaVf;
  @ManyToOne(
    () => ExamenModulo,
    (examenModulo) => examenModulo.preguntasModulo,
    {
     
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  examenModulo: ExamenModulo;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
