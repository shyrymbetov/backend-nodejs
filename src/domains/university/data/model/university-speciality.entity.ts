import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import {env} from '../../../../env';
import {AdditionalDateType} from "../../types/additional-date.type";
import {UniversityEntity} from "../../model/university.entity";
import {ScholarshipEnum} from "../../types/scholarship.enum";
import {EduDegreeEnum} from "../../types/edu-degree.enum";
import {UniversityImportantDatesEntity} from "../../model/university-important-dates.entity";
import {UniversityFacultyEntity} from "./university-faculty.entity";

@Entity({schema: env.DB_SCHEMA})
export class UniversitySpecialityEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => UniversityFacultyEntity, faculty => faculty.specialities)
    @JoinColumn({ name: 'facultyId' }) // Correct the join column name to 'universityId'
    faculty!: UniversityFacultyEntity;

    @Column()
    name!: string

    @Column()
    minCost!: number

    @Column()
    maxCost!: number

    @Column('varchar',{array: true, nullable: true})
    directions!: string[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
