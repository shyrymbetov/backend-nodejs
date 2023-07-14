import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import {UserRoleEnum} from './types/user-role.enum';
import {env} from '../../env';

@Entity({schema: env.DB_SCHEMA})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({type: 'uuid', nullable: true})
    avatar!: string;

    @Column({type: 'varchar', unique: true})
    email!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({type: 'varchar', nullable: true })
    hashedPassword!: string | null;

    @Column({type: 'boolean', default: false})
    active!: boolean;

    @Column()
    birthDate!: Date;

    @Column()
    phone!: string;

    @Column({type: 'uuid'})
    regionId!: string;

    @Column({type: 'uuid'})
    localId!: string;

    @Column({type: 'uuid', nullable: true })
    school!: string | null;

    @Column({type: 'int', nullable: true })
    class!: number | null;

    @Column({type: 'uuid', nullable: true })
    masterId!: string | null;

    @Column({type: 'uuid', nullable: true })
    orientatorId!: string | null;

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
    })
    role!: UserRoleEnum;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
