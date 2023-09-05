import z from 'zod';

export const ApplicationActionsSchema = z.object({
  body: z
    .object({
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
