import { from } from 'rxjs';
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

@Entity('actividades_extraclases')
export class ActividadesExtraclase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  punto: number;
  @Column()
  orientacion: string;
  @Column()
  documentos: string;

  @Column()
  fecha_entrega: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  @ManyToOne(
    () => Actividad,
    (actividades) => actividades.actividades_extraclases,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  actividad: Actividad;
}
