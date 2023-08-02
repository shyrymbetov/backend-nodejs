import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import {env} from '../../../env';
import {AdditionalDateType} from "../types/additional-date.type";
import {UniversityEntity} from "./university.entity";
import {ScholarshipEnum} from "../types/scholarship.enum";
import {EduDegreeEnum} from "../types/edu-degree.enum";
import {UniversityImportantDatesEntity} from "./university-important-dates.entity";
import {UniversityFacultyEntity} from "../data/model/university-faculty.entity";

@Entity({schema: env.DB_SCHEMA})
export class UniversityDegreeEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => UniversityEntity, university => university.eduDegrees)
    @JoinColumn({ name: 'universityId' }) // Correct the join column name to 'universityId'
    university!: UniversityEntity;

    @Column({
        type: 'enum',
        enum: EduDegreeEnum,
    })
    degree!: EduDegreeEnum

    @Column()
    description!: string

    @OneToMany(() => UniversityFacultyEntity, faculty => faculty.degree, {cascade: true})
    faculties!: UniversityFacultyEntity[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
