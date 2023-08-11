import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne, JoinColumn, OneToOne,
} from 'typeorm';
import {env} from '../../../env';
import {UniversityEntity} from "./university.entity";
import {AdmissionCertificatesType} from "../types/admission-certificates.type";
import {AdmissionRequirementsType} from "../types/admission-requirements.type";

@Entity({schema: env.DB_SCHEMA})
export class UniversityAdmissionRequirementsEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => UniversityEntity, university => university.admissionRequirements)
    @JoinColumn({ name: 'universityId' }) // Correct the join column name to 'universityId'
    university!: UniversityEntity;

    @Column({nullable: true})
    title!: string

    @Column({nullable: true})
    description!: string

    @Column({ type: 'json' })
    certificates!: AdmissionCertificatesType[]

    @Column({ type: 'json' })
    requirements!: AdmissionRequirementsType[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
