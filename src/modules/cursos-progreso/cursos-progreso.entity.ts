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
import { ClasePasada } from '../clases-pasadas/clases-pasadas.entity';
import { UltimaClase } from '../ultima-clase/ultima-clase.entity';
import { ModulosPasados } from '../modulos-pasados/modulos-pasados.entity';
import {ModuloActual} from '../modulo-actual/modulo-actual.entity';
@Entity('cursos-progreso')
export class CursosProgreso extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => PlanEstudio, (planEstudio) => planEstudio.cursosProgreso)
  planEstudio: PlanEstudio;
  @ManyToMany(() => Nota, { eager: true })
  notas: Nota[];
  @ManyToOne(() => Curso, (curso) => curso.cursosprogreso, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  curso: Curso;
  @OneToMany(
    () => ModulosPasados,
    (modulospasados) => modulospasados.cursoProgreso,
  )
  @JoinTable()
  modulospasados: ModulosPasados[];

  @OneToOne(() => ModuloActual, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  moduloActual: ModuloActual;

  
}

  
