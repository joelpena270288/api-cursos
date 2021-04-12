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

import { User } from '../user/user.entity';
import { Actividad } from '../actividad/actividad.entity';
import { CursosProgreso } from '../cursos-progreso/cursos-progreso.entity';
@Entity('notas')
export class Nota extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  nota: number;

  @OneToOne(() => Actividad)
  @JoinColumn()
  actividades: Actividad;
 
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
