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
import { Actividad } from '../actividad/actividad.entity';

@Entity('videos')
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  nombre: string;
  @Column()
  link: string;
  @ManyToOne(() => Actividad, (actividad) => actividad.video)
  actividad: Actividad;
}
