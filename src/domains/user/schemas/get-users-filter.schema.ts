import z from 'zod';

export const GetUsersFilterSchema = z.object({
  body: z.object({}).strict(),
  query: z.object({
      page: z.string().regex(/^\d+$/).transform(Number),
      roles: z.string().transform((val) => val.split(',')).optional(),
      size: z.string().regex(/^\d+$/).transform(Number),
      search: z.string().optional(),
  }).strict(),
  params: z.object({}).strict(),
});
