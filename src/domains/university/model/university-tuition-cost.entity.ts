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
import {CostAdditionalType} from "../types/cost-additional.type";
import {CostProgramType} from "../types/cost-program.type";

@Entity({schema: env.DB_SCHEMA})
export class UniversityTuitionCostEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => UniversityEntity, university => university.tuitionCost)
    @JoinColumn({ name: 'universityId' }) // Correct the join column name to 'universityId'
    university!: UniversityEntity;

    @Column({nullable: true})
    title!: string

    @Column({nullable: true})
    description!: string

    @Column({nullable: true})
    tuitionCost!: number

    @Column({nullable: true})
    fullCost!: number

    @Column({ type: 'json',nullable: true })
    additionalCost!: CostAdditionalType[]

    @Column({ type: 'json',nullable: true })
    programCost!: CostProgramType[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
