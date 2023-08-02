import z from 'zod';

export const CreateStateSchema = z.object({
  body: z
    .object({
        id: z.string().optional(),
        countryId: z.string(),
        name: z.string(),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
