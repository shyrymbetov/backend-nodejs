import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne,
} from 'typeorm';
import {env} from '../../../env';
import {WorksheetFieldEnum} from "../types/worksheet-field-type.enum";
import {TextLimitationType} from "../types/text-limitation.type";
import {FieldAnswerTypeEnum} from "../types/field-answer-type.enum";
import {QuantityType} from "../types/quantity.type";
import {WorksheetEntity} from "./worksheet.entity";

@Entity({schema: env.DB_SCHEMA})
export class WorksheetFieldsEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    //Academic Information
    @Column({
        type: 'enum',
        enum: WorksheetFieldEnum,
    })
    type!: WorksheetFieldEnum

    @Column({type:'varchar', nullable: true})
    placeholder!: string

    @Column({type:'varchar',nullable: true})
    description!: string

    @Column({type:'varchar',nullable: true})
    title!: string | null

    @Column({default: false})
    required!: boolean

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

    @ManyToOne(() => WorksheetEntity, worksheet => worksheet.profileFields)
    profile!: WorksheetEntity;

    @ManyToOne(() => WorksheetEntity, worksheet => worksheet.contactsFields)
    contacts!: WorksheetEntity;

    @ManyToOne(() => WorksheetEntity, worksheet => worksheet.educationFields)
    education!: WorksheetEntity;

    @ManyToOne(() => WorksheetEntity, worksheet => worksheet.languagesFields)
    languages!: WorksheetEntity;

    @ManyToOne(() => WorksheetEntity, worksheet => worksheet.recommendationsFields)
    recommendations!: WorksheetEntity;

    @ManyToOne(() => WorksheetEntity, worksheet => worksheet.motivationFields)
    motivation!: WorksheetEntity;

    @ManyToOne(() => WorksheetEntity, worksheet => worksheet.documentsFields)
    documents!: WorksheetEntity;

    @ManyToOne(() => WorksheetEntity, worksheet => worksheet.otherFields)
    other!: WorksheetEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
