import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  
  ManyToOne,
  
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actividad } from '../actividad/actividad.entity';

@Entity('contenidos')
export class Contenido extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  cuerpo: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Actividad, (actividades) => actividades.contenidos, {
    cascade: true,
    onDelete: 'CASCADE'
    
  })
  actividad: Actividad;
}
