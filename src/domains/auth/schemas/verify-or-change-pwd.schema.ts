import z from 'zod';

export const VerifyOrChangePwdSchema = z.object({
  body: z.object({ email: z.string().optional(), password: z.string() }).strict(),
  query: z.object({}).strict(),
  params: z.object({linkId: z.string()}).strict(),
});
