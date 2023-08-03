import z from 'zod';
import {isValidUUID} from "../../../../shared/util.service";

export const CreateCountrySchema = z.object({
  body: z
    .object({
        id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
        name: z.string(),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
