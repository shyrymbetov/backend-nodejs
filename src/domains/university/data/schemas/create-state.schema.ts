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

export const CreateStateSchema = z.object({
  body: z
    .object({
        id: z.string().nullable().default(null),
        countryId: z.string(),
        name: z.string(),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
