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
import { Clase } from '../clase/clase.entity';
import { Video } from '../video/video.entity';
import { Documento } from '../documento/documento.entity';
import { Contenido } from '../contenido/contenido.entity';

import { PreguntaHtml } from '../pregunta-html/preguntahtml.entity';
import { ActividadesExtraclase } from '../actividad-extraclase/actividadextraclase.entity';

@Entity('actividades')
export class Actividad extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  nombre: string;
  @Column()
  nota: number;
  @Column()
  descripcion: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  
  @ManyToOne(() => Clase, (clase) => clase.actividades)
  clase: Clase;
  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;
  @OneToMany(() => Video, (video) => video.actividad)
  video: Video;
  @OneToMany(() => Documento, (documento) => documento.actividad)
  documentos: Documento[];
  @OneToMany(() => Contenido, (contenido) => contenido.actividad)
  contenidos: Contenido[];

  @OneToMany(() => PreguntaHtml, (preguntahtml) => preguntahtml.actividad)
  preguntas_html: PreguntaHtml[];
  @OneToMany(() => ActividadesExtraclase,(actividadextraclase) => actividadextraclase.actividad)
  actividades_extraclases: PreguntaHtml[];
}
