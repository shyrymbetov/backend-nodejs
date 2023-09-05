import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne,
} from 'typeorm';
import {env} from '../../../env';
import {WorksheetFieldEnum} from "../../worksheet/types/worksheet-field-type.enum";
import {TextLimitationType} from "../../worksheet/types/text-limitation.type";
import {FieldAnswerTypeEnum} from "../../worksheet/types/field-answer-type.enum";
import {QuantityType} from "../../worksheet/types/quantity.type";
import {ApplicationEntity} from "./application.entity";

@Entity({schema: env.DB_SCHEMA})
export class ApplicationFieldsEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({type: 'uuid', nullable : true})
    worksheetFieldId!: string

    @Column({type: 'text', nullable : true})
    fieldValue!: string

    //Academic Information
    @Column({
        type: 'enum',
        enum: WorksheetFieldEnum,
    })
    type!: WorksheetFieldEnum

    @Column({type:'varchar', nullable: true})
    placeholder!: string | null

    @Column({type:'text',nullable: true})
    description!: string | null

    @Column({type:'varchar',nullable: true})
    title!: string | null

    @Column({default: false})
    required!: boolean

    @Column({default: 0})
    index!: number

    @Column({type:'boolean',nullable: true})
    isMultipleUpload!: boolean | null

    @Column({type:'boolean',nullable: true})
    isFirstOptionEmpty!: boolean | null

    @Column({type:'boolean',nullable: true})
    isCheckedByDefault!: boolean | null

    @Column({ type: 'json', nullable: true })
    textLimitation!: TextLimitationType | null

    @Column('varchar',{array: true, nullable: true})
    options!: string[] | null

    @Column({
        type: 'enum',
        enum: FieldAnswerTypeEnum,
        nullable: true
    })
    answerType!: FieldAnswerTypeEnum | null

    @Column({type:'varchar',nullable: true})
    text!: string | null

    @Column({type:'varchar',nullable: true})
    dateFormat!: string | null

    @Column({ type: 'json', nullable: true })
    quantity!: QuantityType | null

    @Column({type: 'text', nullable: true})
    content!: string | null

    @ManyToOne(() => ApplicationEntity, application => application.profileFields)
    profile?: ApplicationEntity;

    @ManyToOne(() => ApplicationEntity, application => application.contactsFields)
    contacts?: ApplicationEntity;

    @ManyToOne(() => ApplicationEntity, application => application.educationFields)
    education?: ApplicationEntity;

    @ManyToOne(() => ApplicationEntity, application => application.languagesFields)
    languages?: ApplicationEntity;

    @ManyToOne(() => ApplicationEntity, application => application.recommendationsFields)
    recommendations?: ApplicationEntity;

    @ManyToOne(() => ApplicationEntity, application => application.motivationFields)
    motivation?: ApplicationEntity;

    @ManyToOne(() => ApplicationEntity, application => application.documentsFields)
    documents?: ApplicationEntity;

    @ManyToOne(() => ApplicationEntity, application => application.otherFields)
    other?: ApplicationEntity;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn()
    deactivatedAt?: Date;
}
