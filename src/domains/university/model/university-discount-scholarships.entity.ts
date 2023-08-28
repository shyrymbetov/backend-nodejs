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
import {CostProgramType} from "../types/cost-program.type";

@Entity({schema: env.DB_SCHEMA})
export class UniversityDiscountScholarshipsEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => UniversityEntity, university => university.scholarships)
    @JoinColumn({ name: 'universityId' }) // Correct the join column name to 'universityId'
    university!: UniversityEntity;

    @Column({type: 'varchar',nullable: true})
    title!: string | null

    @Column({type: 'text',nullable: true})
    description!: string | null

    @Column({ type: 'json' })
    programCost!: CostProgramType[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
