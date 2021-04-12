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
import { PlanEstudio } from '../plan-estudio/plan-estudio.entity';
import { Nota } from '../nota/nota.entity';
@Entity('cursos-pasados')
export class CursosPasados extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => PlanEstudio, (planEstudio) => planEstudio.cursosPasados)
  planEstudio: PlanEstudio;
  @ManyToMany(() => Curso, { eager: true })
  @JoinTable()
  curso: Curso[];
  @ManyToMany(() => Nota, { eager: true })
  notas: Nota[];
}
