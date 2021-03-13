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
import { Modulo } from '../modulo/modulo.entity';
import { Actividades } from '../actividad/actividad.entity';
@Entity('clases')
export class Clase extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  nota: number;
  @Column()
  fecha_inicio: Date;
  @ManyToOne(() => Modulo, (modulo) => modulo.clases)
  modulo: Modulo;
  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;
  @OneToMany(() => Actividades, (actividad) => actividad.clase)
  actividades: Actividades[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
