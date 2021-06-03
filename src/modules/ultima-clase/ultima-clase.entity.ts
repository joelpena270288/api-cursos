import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CursosProgreso } from '../cursos-progreso/cursos-progreso.entity';
import { ExamenModulo } from '../examen-modulo/examen-modulo.entity';
import { Clase } from '../clase/clase.entity';
import { ExamenFinal } from '../examen-final-curso/examen-final.entity';
@Entity('ultimaclase')
export class UltimaClase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Clase, (clase) => clase.ultimasclases, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  clase: Clase;

  @ManyToOne(() => ExamenModulo, (examenModulo) => examenModulo.ultimaclase, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  examenModulo: ExamenModulo;

  @ManyToOne(() => ExamenFinal, (examenFinal) => examenFinal.ultimaclase, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  examenFinal: ExamenFinal;
  @Column({ default: 0, type: 'decimal' })
  nota: number;
}
