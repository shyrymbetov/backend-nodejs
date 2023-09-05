import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, OneToMany, JoinColumn, OneToOne, ManyToOne,
} from 'typeorm';
import {env} from '../../../env';

import {UniversityEntity} from "../../university/model/university.entity";
import {UserEntity} from "../../user/model/user.entity";
import {ChatEntity} from "../../chat/model/chat.entity";
import {ApplicationSpecialityType} from "../type/application-speciality.type";
import {ApplicationStatusEnum} from "../type/application-status.enum";
import {ApplicationActionStatusEnum} from "../type/application-action-status.enum";
import {ApplicationFieldsEntity} from "./application-fields.entity";

@Entity({schema: env.DB_SCHEMA})
export class ApplicationEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid')
    studentId!: string

    @ManyToOne(() => UserEntity, user => user.applications, {nullable: true})
    @JoinColumn({name: 'student_id'}) // Correct the join column name to 'universityId'
    student!: UserEntity;

    @Column('uuid')
    universityId!: string

    @ManyToOne(() => UniversityEntity, {nullable: true})
    @JoinColumn({ name: 'university_id' }) // Correct the join column name to 'universityId'
    university?: UniversityEntity;

    @Column({type: 'json', nullable: true})
    specialityType!: ApplicationSpecialityType

    @OneToOne(() => ChatEntity, chat => chat.application)
    chat!: UniversityEntity;

    @Column({default: false, nullable: true})
    isArchived!: boolean

    @Column({
        type: 'enum',
        enum: ApplicationStatusEnum,
    })
    applicationStatus!: ApplicationStatusEnum

    @Column({
        type: 'enum',
        enum: ApplicationActionStatusEnum,
        nullable: true
    })
    actionsStatus!: ApplicationActionStatusEnum | null

    @OneToMany(() => ApplicationFieldsEntity, date => date.profile, {eager: true, cascade: true})
    profileFields!: ApplicationFieldsEntity[];

    @OneToMany(() => ApplicationFieldsEntity, date => date.contacts, {eager: true, cascade: true})
    contactsFields!: ApplicationFieldsEntity[];

    @OneToMany(() => ApplicationFieldsEntity, date => date.education, {eager: true, cascade: true})
    educationFields!: ApplicationFieldsEntity[];

    @OneToMany(() => ApplicationFieldsEntity, date => date.languages, {eager: true, cascade: true})
    languagesFields!: ApplicationFieldsEntity[];

    @OneToMany(() => ApplicationFieldsEntity, date => date.recommendations, {eager: true, cascade: true})
    recommendationsFields!: ApplicationFieldsEntity[];

    @OneToMany(() => ApplicationFieldsEntity, date => date.motivation, {eager: true, cascade: true})
    motivationFields!: ApplicationFieldsEntity[];

    @OneToMany(() => ApplicationFieldsEntity, date => date.documents, {eager: true, cascade: true})
    documentsFields!: ApplicationFieldsEntity[];

    @OneToMany(() => ApplicationFieldsEntity, date => date.other, {eager: true, cascade: true})
    otherFields!: ApplicationFieldsEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
