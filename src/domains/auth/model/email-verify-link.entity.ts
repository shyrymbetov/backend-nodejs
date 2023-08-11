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
export class EmailVerifyLinkEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({type: 'uuid'})
    userId!: string;

    @Column()
    email!: string;

    @Column()
    code!: string;

    @Column()
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
