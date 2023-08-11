import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const UniversityImportantDateSchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    name: z.string().optional(),
    deadline: z.string().datetime().optional().transform(val =>val ? new Date(Date.parse(val)) : undefined),
    additionalDates: z.array(
        z.object({
            date: z.string().datetime().optional().transform(val => val ? new Date(Date.parse(val)) : undefined),
            description: z.string()
        })
    ).optional().transform((val) => val ?? []),
});
