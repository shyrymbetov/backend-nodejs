import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import {env} from '../../../env';

@Entity({schema: env.DB_SCHEMA})
export class PasswordChangeLinkEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({type: 'uuid'})
    userId!: string;

    @Column({type: 'boolean', default: false})
    used!: boolean;

    @Column()
    expiredDate!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
