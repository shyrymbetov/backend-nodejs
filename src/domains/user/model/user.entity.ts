import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import {UserRoleEnum} from '../types/user-role.enum';
import {env} from '../../../env';

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

    @Column({type: 'boolean', default: false})
    verified!: boolean;

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

    @ManyToOne(() => UserEntity, user => user.orientatorStudents)
    @JoinColumn({ name: 'orientator_id' })
    orientator?: UserEntity;

    @ManyToOne(() => UserEntity, user => user.masterStudents)
    @JoinColumn({ name: 'master_id' })
    master?: UserEntity;

    @OneToMany(() => UserEntity, user => user.orientator)
    orientatorStudents?: UserEntity[];

    @OneToMany(() => UserEntity, user => user.master)
    masterStudents?: UserEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
