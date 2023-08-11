import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const UniversityAdmissionInformationSchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    title: z.string().optional(),
    description: z.string().optional(),
    admissionSteps: z.array(
        z.object({
            index: z.number().positive(),
            name: z.string().optional(),
            description: z.string().optional()
        })
    ).optional().transform((val) => val ?? []),
});
