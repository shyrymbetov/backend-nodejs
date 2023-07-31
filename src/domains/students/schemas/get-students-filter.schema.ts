import z from 'zod';

export const GetStudentsFilterSchema = z.object({
  body: z.object({}).strict(),
  query: z.object({
      page: z.string().regex(/^\d+$/).transform(Number),
      size: z.string().regex(/^\d+$/).transform(Number),
      search: z.string().optional(),
      orientatorId: z.string().optional(),
      masterId: z.string().optional(),
      localId: z.string().optional(),
      school: z.string().optional(),
      class: z.string().optional(),
  }).strict(),
  params: z.object({}).strict(),
});
