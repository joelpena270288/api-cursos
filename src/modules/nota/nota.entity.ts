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
import { Actividades } from '../actividad/actividad.entity';
@Entity('notas')
export class Nota extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  nota: number;
  ultima_actividad: number;

  @ManyToOne(() => User, users => users.notas)
   user: User;
  @OneToOne(() => Actividades)
  @JoinColumn()
  actividades:Actividades
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
