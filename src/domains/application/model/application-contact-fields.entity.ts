import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne,
} from 'typeorm';
import {env} from '../../../env';
import {ApplicationEntity} from "./application.entity";
import {WorksheetFieldEnum} from "../../worksheet/types/worksheet-field-type.enum";
import {TextLimitationType} from "../../worksheet/types/text-limitation.type";
import {FieldAnswerTypeEnum} from "../../worksheet/types/field-answer-type.enum";
import {QuantityType} from "../../worksheet/types/quantity.type";

@Entity({schema: env.DB_SCHEMA})
export class ApplicationContactsFieldsEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text', nullable: true })
    fieldValue!: string

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

    @ManyToOne(() => ApplicationEntity, application => application.contactsFields)
    application!: ApplicationEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
