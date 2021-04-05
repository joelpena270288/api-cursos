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
import {CursosProgreso} from '../cursos-progreso/cursos-progreso.entity';
import {User} from '../user/user.entity'
@Entity('dashboard')
export class Dashboard extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number; 
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}