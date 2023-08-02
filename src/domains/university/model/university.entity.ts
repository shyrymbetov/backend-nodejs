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
import {UniversityAdmissionInformationEntity} from "./university-admission-information.entity";
import {UniversityAdmissionRequirementsEntity} from "./university-admission-requirements.entity";
import {UniversityTuitionCostEntity} from "./university-tuition-cost.entity";
import {UniversityDegreeEntity} from "./university-degree.entity";
import {UniversityDiscountScholarshipsEntity} from "./university-discount-scholarships.entity";
import {WorksheetEntity} from "../../worksheet/model/worksheet.entity";
import {UniversityCountryEntity} from "../data/model/university-country.entity";
import {UniversityStateEntity} from "../data/model/university-state.entity";
import {StudyLanguageEnum} from "../types/study-language.enum";

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

    @ManyToOne(() => UniversityCountryEntity)
    @JoinColumn({ name: 'countryId' }) // Correct the join column name to 'universityId'
    country!: UniversityCountryEntity;

    @ManyToOne(() => UniversityStateEntity)
    @JoinColumn({ name: 'stateId' }) // Correct the join column name to 'universityId'
    state!: UniversityStateEntity;

    @Column()
    city!: string

    @Column()
    description!: string

    @Column({type: 'uuid', nullable: true})
    logo!: string

    @Column()
    color!: string

    @Column('uuid',{array: true, nullable: true})
    gallery!: string[]

    @Column({ type: 'json' })
    keyFacts!: KeyFactType[]

    @Column({ type: 'json' })
    ratingInformation!: RatingInformationType[]

    //Information in the header
    @Column({
        type: 'enum',
        enum: TopRatingEnum,
    })
    topRating!: TopRatingEnum

    @Column()
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
    })
    scholarshipType!: ScholarshipEnum

    @Column({
        type: 'enum',
        enum: StudyLanguageEnum,
    })
    studyLanguage!: StudyLanguageEnum

    @OneToMany(
        () => UniversityDegreeEntity,
        degree => degree.university,
        {cascade: true, nullable: true})
    eduDegrees!: UniversityDegreeEntity[]

    //Admission Information
    @OneToOne(
        () => UniversityAdmissionInformationEntity,
        admission => admission.university,
        {cascade: true, nullable: true})
    admissionInformation!: UniversityAdmissionInformationEntity;

    @OneToOne(
        () => UniversityAdmissionRequirementsEntity,
        requirement => requirement.university,
        {cascade: true, nullable: true})
    admissionRequirements!: UniversityAdmissionRequirementsEntity;

    //Price Information
    @OneToOne(
        () => UniversityTuitionCostEntity,
        tuitionCost => tuitionCost.university,
        {cascade: true, nullable: true})
    tuitionCost!: UniversityTuitionCostEntity;

    //Campus Information
    @OneToMany(
        () => UniversityImportantDatesEntity,
        campusInformation => campusInformation.university,
        {cascade: true, nullable: true})
    campusInformation!: UniversityCampusInformationEntity[];

    //Discounts and scholarships
    @OneToOne(
        () => UniversityDiscountScholarshipsEntity,
        scholarships => scholarships.university,
        {cascade: true, nullable: true})
    scholarships!: UniversityDiscountScholarshipsEntity;


    @OneToOne(
        () => WorksheetEntity,
        worksheet => worksheet.university,
        { nullable: true})
    worksheet!: WorksheetEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
