import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CursosProgreso } from '../cursos-progreso/cursos-progreso.entity';
import { Clase } from '../clase/clase.entity';
@Entity('ultimaclase')
export class UltimaClase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Clase, (clase) => clase.ultimasclases, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  clase: Clase;
  @Column({ default: 0, type: 'decimal' })
  nota: number;
}
