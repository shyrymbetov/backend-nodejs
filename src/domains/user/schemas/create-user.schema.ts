import z from 'zod';

export const CreateUserSchema = z.object({
  body: z
    .object({
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      birthDate: z.string().datetime(),
      phone: z.string(),
      regionId: z.string(),
      localId: z.string(),
      type: z.enum(['expert', 'master-expert', 'orientator']).default('orientator'),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({}).strict(),
});
