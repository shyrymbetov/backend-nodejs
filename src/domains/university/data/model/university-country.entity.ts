import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, OneToMany, JoinColumn, OneToOne,
} from 'typeorm';
import {env} from '../../../../env';

@Entity({schema: env.DB_SCHEMA})
export class UniversityCountryEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
