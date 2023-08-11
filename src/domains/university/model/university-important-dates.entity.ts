import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import {env} from '../../../env';
import {AdditionalDateType} from "../types/additional-date.type";
import {UniversityEntity} from "./university.entity";

@Entity({schema: env.DB_SCHEMA})
export class UniversityImportantDatesEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => UniversityEntity, university => university.importantDates)
    @JoinColumn({ name: 'universityId' }) // Correct the join column name to 'universityId'
    university!: UniversityEntity;

    @Column()
    name!: string

    @Column()
    deadline!: Date

    @Column({ type: 'json' })
    additionalDates!: AdditionalDateType[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
