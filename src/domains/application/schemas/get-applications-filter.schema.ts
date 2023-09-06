import z from 'zod';

export const GetApplicationsFilterSchema = z.object({
  body: z.object({}).strict(),
  query: z.object({
      page: z.string().regex(/^\d+$/).transform(Number),
      size: z.string().regex(/^\d+$/).transform(Number),
      studentName: z.string().optional(),
      orientator: z.string().optional(),
      expert: z.string().optional(),
      school: z.string().optional(),
      country: z.string().optional(),
      university: z.string().optional(),
      fall: z.string().optional(),
      status: z.string().optional(),
  }),
  params: z.object({}),
});
