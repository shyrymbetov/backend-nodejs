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
      rating: z.enum(Object.values(TopRatingEnum)).optional(),
      scholarshipType: z.enum(Object.values(ScholarshipEnum)).optional(),
      minFee: z.number().positive().optional(),
      maxFee: z.number().positive().optional(),
      degree: z.enum(Object.values(EduDegreeEnum)).optional(),
  }).strict(),
  params: z.object({}).strict(),
});
