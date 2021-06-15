import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Curso } from '../curso/curso.entity';
import { Clase } from '../clase/clase.entity';
import { ExamenModulo } from '../examen-modulo/examen-modulo.entity';
import { ModuloActual } from '../modulo-actual/modulo-actual.entity';

@Entity('modulos')
export class Modulo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  nota: number;
  @Column()
  numeromodulo: number;
  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;
  @ManyToOne(() => Curso, (cursos) => cursos.modulos, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  curso: Curso;

  @OneToOne((type) => ExamenModulo, (examenModulo) => examenModulo.modulo, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  examen: ExamenModulo;

  @OneToMany(() => Clase, (clase) => clase.modulo)
  clases: Clase[];
  @OneToMany(() => ModuloActual, (moduloactual) => moduloactual.modulo)
  moduloactual: ModuloActual[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
