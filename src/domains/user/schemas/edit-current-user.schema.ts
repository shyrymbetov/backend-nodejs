import z from 'zod';

export const EditCurrentUserSchema = z.object({
  body: z
    .object({
      id: z.string().nullable().default(null),
      email: z.string().nullable().default(null),
      firstName: z.string(),
      lastName: z.string(),
      birthDate: z.string().datetime(),
      phone: z.string(),
      regionId: z.string(),
      localId: z.string(),
      school: z.string().nullable(),
      class: z.number().nullable(),
      type: z.string().nullable().default(null),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({}).strict(),
});
