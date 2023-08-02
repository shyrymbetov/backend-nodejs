import z from 'zod';

export const CreateCountrySchema = z.object({
  body: z
    .object({
        id: z.string().optional(),
        name: z.string(),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
