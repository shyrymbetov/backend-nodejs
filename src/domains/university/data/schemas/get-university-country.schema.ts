import z from 'zod';

export const GetUniversityCountryFilterSchema = z.object({
  body: z.object({}).strict(),
  query: z.object({
      search: z.string().optional(),
      universityId: z.string().optional(),
  }).strict(),
  params: z.object({}).strict(),
});
