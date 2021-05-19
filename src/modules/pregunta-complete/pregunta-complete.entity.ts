import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PalabraOrden } from '../palabra-orden/palabra-orden.entity';

@Entity('preguntas-complete')
export class PreguntaComplete extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text' })
  pregunta: string;
  @OneToMany((type) => PalabraOrden, (palabra) => palabra.preguntaComplete)
  palabras: PalabraOrden[];

}
