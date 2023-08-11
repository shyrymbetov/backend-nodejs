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
import {ApplicationContactsFieldsEntity} from "./application-contact-fields.entity";
import {ApplicationEducationFieldsEntity} from "./application-education-fields.entity";
import {ApplicationLanguagesFieldsEntity} from "./application-language-fields.entity";
import {ApplicationRecommendationsFieldsEntity} from "./application-recomandations-fields.entity";
import {ApplicationMotivationFieldsEntity} from "./application-motivation-fields.entity";
import {ApplicationDocumentsFieldsEntity} from "./application-documents-fields.entity";
import {ApplicationOtherFieldsEntity} from "./application-other-fields.entity";
import {ApplicationProfileFieldsEntity} from "./application-profile-fields.entity";

@Entity({schema: env.DB_SCHEMA})
export class ApplicationEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => UserEntity, user => user.applications)
    @JoinColumn({name: 'studentId'}) // Correct the join column name to 'universityId'
    student!: UserEntity;

    @ManyToOne(() => UniversityEntity, university => university.applications)
    @JoinColumn({name: 'universityId'}) // Correct the join column name to 'universityId'
    university!: UniversityEntity;

    @Column({type: 'json'})
    specialityType!: ApplicationSpecialityType

    @OneToOne(() => ChatEntity, chat => chat.application)
    chat!: UniversityEntity;

    @Column()
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
    actionsStatus!: ApplicationActionStatusEnum

    @OneToMany(() => ApplicationProfileFieldsEntity,
        field => field.application, {eager: true, cascade: true})
    profileFields!: ApplicationProfileFieldsEntity[];

    @OneToMany(() => ApplicationContactsFieldsEntity,
        field => field.application,
        {eager: true, cascade: true})
    contactsFields!: ApplicationContactsFieldsEntity[];

    @OneToMany(() => ApplicationEducationFieldsEntity,
        field => field.application,
        {eager: true, cascade: true})
    educationFields!: ApplicationEducationFieldsEntity[];

    @OneToMany(() => ApplicationLanguagesFieldsEntity,
        field => field.application,
        {eager: true, cascade: true})
    languagesFields!: ApplicationLanguagesFieldsEntity[];

    @OneToMany(() => ApplicationRecommendationsFieldsEntity,
        field => field.application,
        {eager: true, cascade: true})
    recommendationsFields!: ApplicationRecommendationsFieldsEntity[];

    @OneToMany(() => ApplicationMotivationFieldsEntity,
        field => field.application,
        {eager: true, cascade: true})
    motivationFields!: ApplicationMotivationFieldsEntity[];

    @OneToMany(() => ApplicationDocumentsFieldsEntity,
        field => field.application,
        {eager: true, cascade: true})
    documentsFields!: ApplicationDocumentsFieldsEntity[];

    @OneToMany(() => ApplicationOtherFieldsEntity,
        field => field.application,
        {eager: true, cascade: true})
    otherFields!: ApplicationOtherFieldsEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
