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

    @Column({nullable: true})
    title!: string

    @Column({type:'text', nullable: true})
    description!: string

    @Column({type:'text', nullable: true})
    additionalDescription!: string

    @Column({type: 'uuid', nullable: true})
    image!: string | null

    @Column({ type: 'json' })
    additionalInformation!: AdditionalInformationType[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
