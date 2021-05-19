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

@Entity('documentos')
export class Documento extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nombre: string;
  @Column()
  link: string;
 
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  @ManyToOne(() => Actividad, actividades => actividades.documentos, {
    cascade: true,
    onDelete: 'CASCADE'
    
  })
  actividad: Actividad;
}
