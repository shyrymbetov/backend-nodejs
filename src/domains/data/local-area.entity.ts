import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { env } from '../../env';

@Entity({ schema: env.DB_SCHEMA })
export class LocalAreaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'uuid'})
  regionId!: string;

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
