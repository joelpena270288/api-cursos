import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Curso } from '../curso/curso.entity';
import { User } from '../user/user.entity';
@Entity('estado_cursos')
export class EstadoCurso extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  ultima_clase: number;
  @Column()
  ultima_seccion: number;
  @ManyToOne(() => User, user => user.estadocursos)
  
  user: User;
  @Column()
  status: string;
  @OneToOne(() => Curso)
  @JoinColumn()
    curso: Curso;
  
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
