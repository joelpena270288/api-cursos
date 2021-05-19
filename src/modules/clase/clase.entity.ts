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
import { Actividad } from '../actividad/actividad.entity';
import { ClasePasada } from '../clases-pasadas/clases-pasadas.entity';
import { UltimaClase } from '../ultima-clase/ultima-clase.entity';
import { from } from 'rxjs';
@Entity('clases')
export class Clase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  nota: number;
  @Column()
  numeroclase: number;
  @Column()
  fecha_inicio: Date;
  @ManyToOne(() => Modulo, (modulo) => modulo.clases, {
    cascade: true,
    onDelete: 'CASCADE'
    
  })
  modulo: Modulo;
  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;
  @OneToMany(() => Actividad, (actividad) => actividad.clase)
  actividades: Actividad[];
  @OneToMany(() => ClasePasada, (clasepasada) => clasepasada.clase)
  clasespasadas: ClasePasada[];
  @OneToMany(() => UltimaClase, (ultimaclase) => ultimaclase.clase)
  ultimasclases: UltimaClase[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
