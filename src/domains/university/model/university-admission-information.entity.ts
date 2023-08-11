import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import {env} from '../../../env';
import {UniversityEntity} from "./university.entity";
import {AdmissionStepsType} from "../types/admission-steps.type";

@Entity({schema: env.DB_SCHEMA})
export class UniversityAdmissionInformationEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => UniversityEntity, university => university.admissionInformation)
    @JoinColumn({name: 'universityId'}) // Correct the join column name to 'universityId'
    university!: UniversityEntity;

    @Column()
    title!: string

    @Column()
    description!: string

    @Column({type: 'json'})
    admissionSteps!: AdmissionStepsType[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
