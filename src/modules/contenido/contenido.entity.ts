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

@Entity('contenidos')
export class Contenido extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  cuerpo: string;
  @Column()
  nivel: number;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Actividad, actividades => actividades.contenidos)
   actividad: Actividad;
}
