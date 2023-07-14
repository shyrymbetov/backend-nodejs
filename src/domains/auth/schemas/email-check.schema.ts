import z from 'zod';

export const EmailCheckSchema = z.object({
  body: z.object({ email: z.string() }).strict(),
  query: z.object({}).strict(),
  params: z.object({}).strict(),
});
