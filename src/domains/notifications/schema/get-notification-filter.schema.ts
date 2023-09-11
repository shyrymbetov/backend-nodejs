import z from 'zod';

export const GetNotificationFilterSchema = z.object({
  body: z.object({}).strict(),
  query: z.object({
      page: z.string().regex(/^\d+$/).optional().default('1').transform(Number),
      size: z.string().regex(/^\d+$/).optional().default('20').transform(Number),
  }),
  params: z.object({}),
});
