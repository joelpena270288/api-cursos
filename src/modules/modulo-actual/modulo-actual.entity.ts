import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClasePasada } from '../clases-pasadas/clases-pasadas.entity';
import { UltimaClase } from '../ultima-clase/ultima-clase.entity';
import { Modulo } from '../modulo/modulo.entity';
@Entity('modulosactual')
export class ModuloActual extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ClasePasada, (clasespasadas) => clasespasadas.moduloActual)
  @JoinTable()
  clasespasadas: ClasePasada[];

  @OneToOne((type) => UltimaClase, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  ultimaclase: UltimaClase;

  @ManyToOne((type) => Modulo, (modulo) => modulo.moduloactual, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  modulo: Modulo;
}
