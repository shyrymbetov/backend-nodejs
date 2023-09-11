import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, OneToMany, JoinColumn, OneToOne, ManyToOne,
} from 'typeorm';
import {env} from '../../../env';
import {UserType} from "../type/user.type";

@Entity({schema: env.DB_SCHEMA})
export class NotificationEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    header!: string;

    @Column({type: 'text'})
    content!: string;

    @Column({default: false})
    read!: boolean;

    @Column('uuid')
    userId!: string

    @Column({ type: 'json' })
    sender!: UserType;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
