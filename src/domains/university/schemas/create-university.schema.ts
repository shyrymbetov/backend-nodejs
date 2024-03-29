import z from 'zod';
import {TopRatingEnum} from "../types/top-rating.enum";
import {ScholarshipEnum} from "../types/scholarship.enum";
import {KeyFactsSchema} from "./key-facts.schema";
import {RatingInformationSchema} from "./rating-information.schema";
import {UniversityImportantDateSchema} from "./university-important-date.schema";
import {UniversityAdmissionSchema} from "./university-addmission.schema";
import {UniversityTuitionCostSchema} from "./university-tuition-cost.schema";
import {UniversityCampusInformationSchema} from "./university-campus-information.schema";
import {UniversityDiscountScholarshipsSchema} from "./university-discount-scholarships.schema";
import {UniversityDegreeSchema} from "./university-degrees.schema";
import {StudyLanguageEnum} from "../types/study-language.enum";
import {isValidUUID} from "../../../shared/util.service";

export const CreateUniversitySchema = z.object({
  body: z
    .object({
        id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
        isVisible: z.boolean().optional()
            .nullable().transform((val) => val ?? true),
        canApply: z.boolean().optional()
            .nullable().transform((val) => val ?? false),
        universityName: z.string(),
        countryId: z.string(),
        state: z.string().nullable().optional(),
        city: z.string(),
        description: z.string().nullable().optional().transform((val) => val ?? undefined),
        logo: z.string().nullable().default(null).optional().transform((val) => val ? val: undefined),
        fullDescription: z.string().nullable().optional()
            .transform((val) => val ?? undefined),
        color: z.string().optional()
            .nullable().transform((val) => val ? val: undefined),
        gallery: z.array(z.string()).optional().transform((val) => val ?? []),
        keyFacts: z.array(KeyFactsSchema).optional().transform((val) => val ?? []),
        ratingInformation: z.array(RatingInformationSchema).optional().transform((val) => val ?? []),
        topRating: z.enum(['TOP_100', 'TOP_200', 'TOP_500']).optional()
            .nullable().transform((val) => val ? (val as TopRatingEnum) : undefined),
        studyLanguage: z.enum(['ENGLISH', 'GOVERNMENT']).optional()
            .nullable().transform((val) => val ? (val as StudyLanguageEnum) : undefined),
        importantDates: z.array(UniversityImportantDateSchema).optional()
            .nullable().transform((val) => val ?? []),
        scholarshipType: z.enum(['NEED_BASED', 'MERIT', 'GOVERNMENT']).optional()
            .nullable().transform((val) => val ? (val as ScholarshipEnum) : undefined),
        eduDegrees: z.array(UniversityDegreeSchema).optional().transform((val) => val ?? []),
        admission: UniversityAdmissionSchema.nullable().optional().transform((val) => val ? val: undefined),
        tuitionCost: UniversityTuitionCostSchema.nullable().optional().transform((val) => val ? val: undefined),
        campusInformation: z.array(UniversityCampusInformationSchema).optional().transform((val) => val ?? []),
        scholarships: UniversityDiscountScholarshipsSchema.optional().transform((val) => val ? val: undefined),
    }),
  query: z.object({}).strict(),
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
