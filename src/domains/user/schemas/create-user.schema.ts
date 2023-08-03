import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const CreateUserSchema = z.object({
  body: z
    .object({
      id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
      avatar: z.string().nullable().default(null).optional(),
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
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
