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
import { Curso } from '../curso/curso.entity';
import { Dashboard } from '../dashboard/dashboard.entity';
import { Nota } from '../nota/nota.entity';
import { PlanEstudio } from '../plan-estudio/plan-estudio.entity';
@Entity('cursos-progreso')
export class CursosProgreso extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => PlanEstudio, (planEstudio) => planEstudio.cursosProgreso)
  planEstudio: PlanEstudio;
  @ManyToMany(() => Nota, { eager: true })
  notas: Nota[];
  @ManyToMany(() => Curso, { eager: true })
  @JoinTable()
  curso: Curso[];
}
