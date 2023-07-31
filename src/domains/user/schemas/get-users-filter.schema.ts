import z from 'zod';

export const GetUsersFilterSchema = z.object({
  body: z.object({}).strict(),
  query: z.object({
      page: z.string().regex(/^\d+$/).transform(Number),
      size: z.string().regex(/^\d+$/).transform(Number),
      search: z.string().optional(),
      roles: z.string().transform((val) => val.split(','))
  }).strict(),
  params: z.object({}).strict(),
});
