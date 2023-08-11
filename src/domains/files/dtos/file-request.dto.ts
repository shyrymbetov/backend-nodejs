import z from 'zod';
import {FileRequestSchema} from "../schemas/file-request.schema";

export type FileRequestDto = z.infer<typeof FileRequestSchema>;
