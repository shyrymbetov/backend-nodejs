import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const UniversityAdmissionRequirementsSchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    title: z.string().optional(),
    description: z.string().optional(),
    certificates: z.array(
        z.object({
            certificateType: z.string().optional(),
            grade: z.string().optional(),
        })
    ),
    requirements: z.array(
        z.object({
            title: z.string().optional(),
            fields: z.array(
                z.object({
                    name: z.string().optional(),
                    grade: z.string().optional(),
                })
            )
        })
    ),
});
