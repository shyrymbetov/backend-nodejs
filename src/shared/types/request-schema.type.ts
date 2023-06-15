import { Request } from 'express';
import z from 'zod';

export type RequestSchemaType = z.ZodSchema<Request['parsed']>;
