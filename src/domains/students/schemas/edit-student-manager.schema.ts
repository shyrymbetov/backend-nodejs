import z from 'zod';

export const EditStudentManagerSchema = z.object({
  body: z
    .object({
      studentId: z.string(),
      managerId: z.string().nullable(),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({}).strict(),
});
