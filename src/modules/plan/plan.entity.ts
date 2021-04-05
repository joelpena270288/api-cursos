import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('planes')
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
