import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany, JoinColumn, OneToOne, ManyToOne,
} from 'typeorm';
import {env} from '../../../env';
import {UniversityImportantDatesEntity} from "./university-important-dates.entity";
import {KeyFactType} from "../types/key-fact.type";
import {RatingInformationType} from "../types/rating-information.type";
import {TopRatingEnum} from "../types/top-rating.enum";
import {ScholarshipEnum} from "../types/scholarship.enum";
import {UniversityCampusInformationEntity} from "./university-campus-information.entity";
import {UniversityAdmissionEntity} from "./university-admission.entity";
import {UniversityTuitionCostEntity} from "./university-tuition-cost.entity";
import {UniversityDegreeEntity} from "./university-degree.entity";
import {UniversityDiscountScholarshipsEntity} from "./university-discount-scholarships.entity";
import {WorksheetEntity} from "../../worksheet/model/worksheet.entity";
import {UniversityCountryEntity} from "../data/model/university-country.entity";
import {StudyLanguageEnum} from "../types/study-language.enum";
import {ApplicationEntity} from "../../application/model/application.entity";

@Entity({schema: env.DB_SCHEMA})
export class UniversityEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({default: true})
    isVisible!: boolean

    @Column({default: false})
    canApply!: boolean

    //Information in the header
    @Column()
    universityName!: string

    @Column('uuid')
    countryId!: string


    @ManyToOne(() => UniversityCountryEntity)
    @JoinColumn({ name: 'country_id' }) // Correct the join column name to 'universityId'
    country!: UniversityCountryEntity;

    @Column({type:'varchar', nullable: true})
    state!: string | null

    @Column()
    city!: string

    @Column({type:'text', nullable: true})
    description!: string | null

    @Column({type: 'uuid', nullable: true})
    logo!: string | null

    @Column({nullable: true})
    color!: string

    @Column('uuid',{array: true, nullable: true})
    gallery!: string[]

    @Column({ type: 'json'})
    keyFacts!: KeyFactType[]

    @Column({ type: 'json' })
    ratingInformation!: RatingInformationType[]

    //Information in the header
    @Column({
        type: 'enum',
        enum: TopRatingEnum,
        nullable: true
    })
    topRating!: TopRatingEnum

    @Column({type: 'text', nullable: true})
    fullDescription!: string

    @OneToMany(
        () => UniversityImportantDatesEntity,
        date => date.university,
        {cascade: true, nullable: true})
    importantDates!: UniversityImportantDatesEntity[];

    //Academic Information
    @Column({
        type: 'enum',
        enum: ScholarshipEnum,
        nullable: true
    })
    scholarshipType!: ScholarshipEnum

    @Column({
        type: 'enum',
        enum: StudyLanguageEnum,
        nullable: true
    })
    studyLanguage!: StudyLanguageEnum

    @OneToMany(
        () => UniversityDegreeEntity,
        degree => degree.university,
        {cascade: true, nullable: true})
    eduDegrees!: UniversityDegreeEntity[]

    //Admission Information
    @OneToOne(
        () => UniversityAdmissionEntity,
        admission => admission.university,
        {cascade: true, nullable: true})
    admission!: UniversityAdmissionEntity;

    //Price Information
    @OneToOne(
        () => UniversityTuitionCostEntity,
        tuitionCost => tuitionCost.university,
        {cascade: true, nullable: true})
    tuitionCost!: UniversityTuitionCostEntity;

    //Campus Information
    @OneToMany(
        () => UniversityCampusInformationEntity,
        campusInformation => campusInformation.university,
        {cascade: true, nullable: true})
    campusInformation!: UniversityCampusInformationEntity[];

    //Discounts and scholarships
    @OneToOne(
        () => UniversityDiscountScholarshipsEntity,
        scholarships => scholarships.university,
        {cascade: true, nullable: true})
    scholarships!: UniversityDiscountScholarshipsEntity;


    @OneToOne(() => WorksheetEntity, worksheet => worksheet.university, { nullable: true })
    worksheet!: WorksheetEntity | undefined;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
