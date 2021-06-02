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
import { CursosProgreso } from '../cursos-progreso/cursos-progreso.entity';
import { ClasePasada } from '../clases-pasadas/clases-pasadas.entity';
import { UltimaClase } from '../ultima-clase/ultima-clase.entity';
import { Modulo } from '../modulo/modulo.entity';
@Entity('modulospasados')
export class ModulosPasados extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nota: number;
  @ManyToOne(
    () => CursosProgreso,
    (cursoProgreso) => cursoProgreso.modulospasados,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  cursoProgreso: CursosProgreso;
  @OneToOne((type) => Modulo, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  modulo: Modulo;
}
