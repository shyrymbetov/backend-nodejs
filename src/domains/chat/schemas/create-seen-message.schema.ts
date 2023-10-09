import z, {string} from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const CreateSeenMessageSchema = z.object({
    body: z
        .object({
            chatMessageIds: z.string().array(),
            applicationId: z.string(),
        })
        .strict(),
    query: z.object({}).strict(),
    params: z.object({
        id: z.string().optional(),
    }).strict(),
});
