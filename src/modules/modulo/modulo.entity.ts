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
import { Curso } from '../curso/curso.entity';
import { Clase } from '../clase/clase.entity';
import { ClaseService } from '../clase/clase.service';
@Entity('modulos')
export class Modulo extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  nota: number;
  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;
  @ManyToOne(() => Curso, (cursos) => cursos.modulos)
  curso: Curso;
  @OneToMany(() => Clase, (clase) => clase.modulo)
  clases: Clase[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
