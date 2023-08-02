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

export const CreateUniversitySchema = z.object({
  body: z
    .object({
        id: z.string().nullable().default(null),
        isVisible: z.string().optional(),
        canApply: z.string().optional(),
        universityName: z.string(),
        country: z.string().optional(),
        state: z.string().nullable().default(null).optional(),
        city: z.string(),
        description: z.string().nullable().default(null).optional(),
        logo: z.string().nullable().default(null).optional(),
        color: z.string().nullable().default(null).optional(),
        gallery: z.array(z.string()).optional().transform((val) => val ?? []),
        keyFacts: z.array(KeyFactsSchema).optional().transform((val) => val ?? []),
        ratingInformation: z.array(RatingInformationSchema).optional().transform((val) => val ?? []),
        topRating: z.enum(Object.values(TopRatingEnum)).optional(),
        fullDescription: z.string().nullable().default(null).optional(),
        importantDates: z.array(UniversityImportantDateSchema).optional().transform((val) => val ?? []),
        scholarshipType: z.enum(Object.values(ScholarshipEnum)).optional(),
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
