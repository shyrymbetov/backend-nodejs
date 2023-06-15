import z from 'zod';
import { TokenPayloadSchema } from '../schemas/token-payload.schema';

export type TokenPayloadType = z.infer<typeof TokenPayloadSchema>;
