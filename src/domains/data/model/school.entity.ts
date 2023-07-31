import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { env } from '../../../env';

@Entity({ schema: env.DB_SCHEMA })
export class SchoolEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'uuid'})
  localId!: string;

  @Column()
  nameKZ!: string;

  @Column()
  nameRU!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deactivatedAt!: Date;
}
