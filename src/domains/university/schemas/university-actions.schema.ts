import z from 'zod';

export const UniversityActionsSchema = z.object({
  body: z
    .object({
        isVisible: z.boolean().optional(),
        canApply: z.boolean().optional(),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
