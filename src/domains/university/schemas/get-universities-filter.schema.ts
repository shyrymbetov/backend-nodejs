import z from 'zod';
import {TopRatingEnum} from "../types/top-rating.enum";
import {ScholarshipEnum} from "../types/scholarship.enum";
import {EduDegreeEnum} from "../types/edu-degree.enum";

export const GetUniversitiesFilterSchema = z.object({
  body: z.object({}).strict(),
  query: z.object({
      page: z.string().regex(/^\d+$/).transform(Number),
      size: z.string().regex(/^\d+$/).transform(Number),
      search: z.string().optional(),
      country: z.string().optional(),
      faculty: z.string().optional(),
      speciality: z.string().optional(),
      rating: z.enum(['TOP_100', 'TOP_200', 'TOP_500']).optional()
          .transform((val) => val ? (val as TopRatingEnum) : undefined),
      scholarshipType: z.enum(['NEED_BASED', 'MERIT', 'GOVERNMENT']).optional()
        .transform((val) => val ? (val as ScholarshipEnum) : undefined),
      minFee: z.number().positive().optional(),
      maxFee: z.number().positive().optional(),
      degree: z.enum(['BACHELOR', 'MASTERS_DEGREE', 'LANGUAGE_PROGRAM', 'FOUNDATION', 'DEGREE_PREPARATION',]).optional()
          .transform((val) => val ? (val as EduDegreeEnum) : undefined),
  }).strict(),
  params: z.object({}).strict(),
});
