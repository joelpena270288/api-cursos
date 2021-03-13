import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actividades } from '../actividad/actividad.entity';

@Entity('videos')
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  nombre: string;
  @Column()
  link: string;
  @ManyToOne(() => Actividades, (actividad) => actividad.video)
  actividad: Actividades;
}
