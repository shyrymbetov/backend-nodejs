import z from 'zod';

export const GetUserStudentsFilterSchema = z.object({
  body: z.object({}).strict(),
  query: z.object({
      page: z.string().regex(/^\d+$/).transform(Number),
      size: z.string().regex(/^\d+$/).transform(Number),
      search: z.string().optional(),
      managerId: z.string().optional()
  }).strict(),
  params: z.object({
      id: z.string()
  }).strict(),
});
