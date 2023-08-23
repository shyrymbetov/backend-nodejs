import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, OneToMany, JoinColumn, OneToOne,
} from 'typeorm';
import {env} from '../../../env';

import {UniversityEntity} from "../../university/model/university.entity";
import {WorksheetFieldsEntity} from "./worksheet-fields.entity";

@Entity({schema: env.DB_SCHEMA})
export class WorksheetEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid')
    universityId!: string

    @OneToOne(() => UniversityEntity, university => university.worksheet)
    @JoinColumn({ name: 'university_id' }) // Correct the join column name to 'universityId'
    university!: UniversityEntity;


    @OneToMany(() => WorksheetFieldsEntity, date => date.profile, {eager: true, cascade: true})
    profileFields!: WorksheetFieldsEntity[];

    @OneToMany(() => WorksheetFieldsEntity, date => date.contacts, {eager: true, cascade: true})
    contactsFields!: WorksheetFieldsEntity[];

    @OneToMany(() => WorksheetFieldsEntity, date => date.education, {eager: true, cascade: true})
    educationFields!: WorksheetFieldsEntity[];

    @OneToMany(() => WorksheetFieldsEntity, date => date.languages, {eager: true, cascade: true})
    languagesFields!: WorksheetFieldsEntity[];

    @OneToMany(() => WorksheetFieldsEntity, date => date.recommendations, {eager: true, cascade: true})
    recommendationsFields!: WorksheetFieldsEntity[];

    @OneToMany(() => WorksheetFieldsEntity, date => date.motivation, {eager: true, cascade: true})
    motivationFields!: WorksheetFieldsEntity[];

    @OneToMany(() => WorksheetFieldsEntity, date => date.documents, {eager: true, cascade: true})
    documentsFields!: WorksheetFieldsEntity[];

    @OneToMany(() => WorksheetFieldsEntity, date => date.other, {eager: true, cascade: true})
    otherFields!: WorksheetFieldsEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
