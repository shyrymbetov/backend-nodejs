import z from 'zod';

export const TokenPayloadSchema = z
  .object({
    user: z
      .object({
        id: z.number(),
      })
      .strict(),
  })
  .nonstrict();
