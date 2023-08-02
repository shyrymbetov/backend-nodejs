import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, OneToMany, JoinColumn, OneToOne, ManyToOne,
} from 'typeorm';
import {env} from '../../../../env';
import {AdditionalDateType} from "../../types/additional-date.type";
import {UniversityImportantDatesEntity} from "../../model/university-important-dates.entity";
import {KeyFactType} from "../../types/key-fact.type";
import {RatingInformationType} from "../../types/rating-information.type";
import {UserRoleEnum} from "../../../user/types/user-role.enum";
import {TopRatingEnum} from "../../types/top-rating.enum";
import {ScholarshipEnum} from "../../types/scholarship.enum";
import {UniversityCampusInformationEntity} from "../../model/university-campus-information.entity";
import {UniversityAdmissionInformationEntity} from "../../model/university-admission-information.entity";
import {UniversityAdmissionRequirementsEntity} from "../../model/university-admission-requirements.entity";
import {UniversityTuitionCostEntity} from "../../model/university-tuition-cost.entity";
import {UniversityDegreeEntity} from "../../model/university-degree.entity";
import {UniversityDiscountScholarshipsEntity} from "../../model/university-discount-scholarships.entity";
import {WorksheetEntity} from "../../../worksheet/model/worksheet.entity";
import {UniversityCountryEntity} from "./university-country.entity";

@Entity({schema: env.DB_SCHEMA})
export class UniversityStateEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => UniversityCountryEntity)
    @JoinColumn({ name: 'countryId' }) // Correct the join column name to 'universityId'
    country!: UniversityCountryEntity;

    @Column()
    name!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
