import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import {env} from '../../../env';
import {UniversityEntity} from "./university.entity";
import {EduDegreeEnum} from "../types/edu-degree.enum";
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
        nullable: true
    })
    degree!: EduDegreeEnum

    @Column({nullable: true})
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
