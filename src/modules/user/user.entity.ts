import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { UserDetails } from './user.details.entity';

import { Nota } from '../nota/nota.entity';
import { UserCodigo } from './user.code.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
  @OneToOne((type) => UserDetails, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetails;
  @OneToOne((type) => UserCodigo, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'codigo_id' })
  codigo: UserCodigo;
  @ManyToMany((type) => Role, (role) => role.users, { eager: true })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
  @Column({ type: 'varchar', default: 'ACTIVE', length: 10 })
  status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
