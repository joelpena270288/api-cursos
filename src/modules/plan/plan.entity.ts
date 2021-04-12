import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Dashboard } from '../dashboard/dashboard.entity';

@Entity('planes')
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToMany(() => Dashboard, { eager: true })
  @JoinTable()
  dashboards: Dashboard[];
}
