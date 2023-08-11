import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import {env} from '../../../../env';
import {UniversityEntity} from "../../model/university.entity";
import {EduDegreeEnum} from "../../types/edu-degree.enum";
import {UniversitySpecialityEntity} from "./university-speciality.entity";
import {UniversityDegreeEntity} from "../../model/university-degree.entity";

@Entity({schema: env.DB_SCHEMA})
export class UniversityFacultyEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => UniversityDegreeEntity, degree => degree.faculties)
    @JoinColumn({ name: 'degreeId' }) // Correct the join column name to 'universityId'
    degree!: UniversityDegreeEntity;

    @Column()
    name!: string

    @OneToMany(() => UniversitySpecialityEntity, date => date.faculty, {cascade: true})
    specialities!: UniversitySpecialityEntity[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
