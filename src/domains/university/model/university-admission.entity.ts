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
import {AdmissionCertificatesType} from "../types/admission-certificates.type";
import {AdmissionRequirementsType} from "../types/admission-requirements.type";

@Entity({schema: env.DB_SCHEMA})
export class UniversityAdmissionEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => UniversityEntity, university => university.admission)
    @JoinColumn({name: 'universityId'}) // Correct the join column name to 'universityId'
    university!: UniversityEntity;

    @Column({type: 'varchar', nullable: true})
    genTitle!: string | null

    @Column({type: 'varchar', nullable: true})
    genDescription!: string | null

    @Column({type: 'json'})
    admissionSteps!: AdmissionStepsType[]

    @Column({type: 'varchar', nullable: true})
    reqTitle!: string | null

    @Column({type: 'varchar', nullable: true})
    reqDescription!: string | null

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
