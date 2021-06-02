import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModuloActual } from '../modulo-actual/modulo-actual.entity';
import { ModulosPasados } from '../modulos-pasados/modulos-pasados.entity';
import { Clase } from '../clase/clase.entity';
@Entity('clasespasadas')
export class ClasePasada extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => ModuloActual, (moduloActual) => moduloActual.clasespasadas, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  moduloActual: ModuloActual;

  @Column({ default: 0, type: 'decimal' })
  nota: number;
  @ManyToOne(() => Clase, (clase) => clase.clasespasadas)
  clase: Clase;
}
