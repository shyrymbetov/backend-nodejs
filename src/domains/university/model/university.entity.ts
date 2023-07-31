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
export class UniversityEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    universityName!: string

    @Column()
    country!: string

    @Column()
    state!: string

    @Column()
    city!: string

    @Column()
    description!: string


    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
