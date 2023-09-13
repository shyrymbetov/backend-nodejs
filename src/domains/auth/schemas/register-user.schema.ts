import z from 'zod';

export const RegisterUserSchema = z.object({
  body: z
    .object({
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      password: z.string(),
      birthDate: z.string().datetime(),
      phone: z.string(),
      regionId: z.string(),
      localId: z.string(),
      school: z.string().nullable(),
      class: z.number().nullable(),
      type: z.enum(['schoolboy', 'student']).default('student'),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({
      userId: z.string().optional()
  }).strict(),
});
