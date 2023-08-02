import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne, JoinColumn, OneToOne,
} from 'typeorm';
import {env} from '../../../env';
import {AdditionalDateType} from "../types/additional-date.type";
import {UniversityEntity} from "./university.entity";
import {AdditionalInformationType} from "../types/additional-information.type";
import {AdmissionStepsType} from "../types/admission-steps.type";
import {CostAdditionalType} from "../types/cost-additional.type";
import {CostProgramType} from "../types/cost-program.type";

@Entity({schema: env.DB_SCHEMA})
export class UniversityDiscountScholarshipsEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => UniversityEntity, university => university.scholarships)
    @JoinColumn({ name: 'universityId' }) // Correct the join column name to 'universityId'
    university!: UniversityEntity;

    @Column()
    title!: string

    @Column()
    description!: string

    @Column({ type: 'json' })
    programCost!: CostProgramType[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
