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
@Entity('modulospasados')
export class ModulosPasados extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(
    () => CursosProgreso,
    (cursoProgreso) => cursoProgreso.modulospasados,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  cursoProgreso: CursosProgreso;
  @OneToMany(() => ClasePasada, (clasespasadas) => clasespasadas.moduloPasado)
  @JoinTable()
  clasespasadas: ClasePasada[];

}

