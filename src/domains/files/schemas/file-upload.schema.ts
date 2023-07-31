import z from 'zod';
import {FileRequestSchema} from "./file-request.schema";

export const FileUploadSchema = z.object({
  files: z.array(FileRequestSchema),
  body: z.object({}).strict(),
  query: z.object({}).strict(),
  params: z.object({}).strict(),
});
