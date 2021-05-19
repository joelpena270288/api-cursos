import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CursosPasados } from '../cursos-pasados/cursos-pasados.entity';
import { CursosProgreso } from '../cursos-progreso/cursos-progreso.entity';
import { User } from '../user/user.entity';
import { Curso } from '../curso/curso.entity';
@Entity('dashboard')
export class Dashboard extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @OneToMany(() => Curso, (curso) => curso.dashboard)
  cursos: Curso[];
  
}
