import z from 'zod';
import {TopRatingEnum} from "../types/top-rating.enum";
import {ScholarshipEnum} from "../types/scholarship.enum";
import {KeyFactsSchema} from "./key-facts.schema";
import {RatingInformationSchema} from "./rating-information.schema";
import {UniversityImportantDateSchema} from "./university-important-date.schema";
import {UniversityAdmissionInformationSchema} from "./university-addmission-information.schema";
import {UniversityAdmissionRequirementsSchema} from "./university-addmission-requirements.schema";
import {UniversityTuitionCostSchema} from "./university-tuitian-cost.schema";
import {UniversityCampusInformationSchema} from "./university-campus-information.schema";
import {UniversityDiscountScholarshipsSchema} from "./university-discount-scholarships.schema";
import {UniversityDegreeSchema} from "./university-degrees.schema";
import {StudyLanguageEnum} from "../types/study-language.enum";
import {isValidUUID} from "../../../shared/util.service";

export const CreateUniversitySchema = z.object({
  body: z
    .object({
        id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
        isVisible: z.boolean().optional(),
        canApply: z.boolean().optional(),
        universityName: z.string(),
        countryId: z.string(),
        state: z.string().optional(),
        city: z.string(),
        description: z.string().optional(),
        logo: z.string().nullable().default(null).optional(),
        fullDescription: z.string().optional(),
        color: z.string().optional(),
        gallery: z.array(z.string()).optional().transform((val) => val ?? []),
        keyFacts: z.array(KeyFactsSchema).optional().transform((val) => val ?? []),
        ratingInformation: z.array(RatingInformationSchema).optional().transform((val) => val ?? []),
        topRating: z.enum(['TOP_100', 'TOP_200', 'TOP_500']).optional().transform((val) => val ? (val as TopRatingEnum) : undefined),
        studyLanguage: z.enum(['ENGLISH', 'GOVERNMENT']).optional().transform((val) => val ? (val as StudyLanguageEnum) : undefined),
        importantDates: z.array(UniversityImportantDateSchema).optional().transform((val) => val ?? []),
        scholarshipType: z.enum(['NEED_BASED', 'MERIT', 'GOVERNMENT']).optional().transform((val) => val ? (val as ScholarshipEnum) : undefined),
        eduDegrees: z.array(UniversityDegreeSchema).optional().transform((val) => val ?? []),
        admissionInformation: UniversityAdmissionInformationSchema.optional(),
        admissionRequirements: UniversityAdmissionRequirementsSchema.optional(),
        tuitionCost: UniversityTuitionCostSchema.optional(),
        campusInformation: z.array(UniversityCampusInformationSchema).optional().transform((val) => val ?? []),
        scholarships: UniversityDiscountScholarshipsSchema.optional(),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
