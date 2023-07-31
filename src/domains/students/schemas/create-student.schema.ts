import z from 'zod';

export const CreateStudentSchema = z.object({
  body: z
    .object({
      id: z.string().nullable().default(null),
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
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
      id: z.string().optional(),
  }).strict(),
});
