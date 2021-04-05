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
import { Dashboard} from '../dashboard/dashboard.entity';
import { User } from '../user/user.entity';
@Entity('planes-estudio')
export class PlanEstudio extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @OneToMany(() => CursosPasados, (cursosPasados) => cursosPasados.planEstudio)
  cursosPasados: CursosPasados[];
  @OneToMany(
    () => CursosProgreso,
    (cursosProgreso) => cursosProgreso.planEstudio,
  )
  cursosProgreso: CursosProgreso[];
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @OneToOne(() => Dashboard)
  @JoinColumn()
  dasboard: Dashboard;
}
