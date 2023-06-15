import { z } from 'zod';

export const StringToIntSchema = z.preprocess(
  (value) => parseInt(z.string().parse(value), 10),
  z.number().positive().min(1)
);
