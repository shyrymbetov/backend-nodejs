import z, {string} from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const CreateChatMessageSchema = z.object({
    body: z.object({
        applicationId: z.string(),
        content: z.string().optional(),
        university: z.string(),
        file: z.string().optional()
    }),
    query: z.object({}).strict(),
    params: z.object({}).strict(),
});
