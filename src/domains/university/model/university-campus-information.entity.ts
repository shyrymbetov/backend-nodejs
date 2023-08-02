import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import {env} from '../../../env';
import {UniversityEntity} from "./university.entity";
import {AdditionalInformationType} from "../types/additional-information.type";

@Entity({schema: env.DB_SCHEMA})
export class UniversityCampusInformationEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => UniversityEntity, university => university.campusInformation)
    @JoinColumn({ name: 'universityId' }) // Correct the join column name to 'universityId'
    university!: UniversityEntity;

    @Column()
    title!: string

    @Column()
    description!: string

    @Column()
    additionalDescription!: string

    @Column('uuid',{array: true, nullable: true})
    gallery!: string[]

    @Column({ type: 'json' })
    additionalInformation!: AdditionalInformationType[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
