import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const UniversityAdmissionSchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    genTitle: z.string().nullable().optional().transform((val) => val ? val: undefined),
    genDescription: z.string().nullable().optional().transform((val) => val ? val: undefined),
    admissionSteps: z.array(
        z.object({
            index: z.number().positive(),
            name: z.string().optional(),
            description: z.string().optional()
        })
    ).optional().transform((val) => val ?? []),
    reqTitle: z.string().nullable().optional().transform((val) => val ? val: undefined),
    reqDescription: z.string().nullable().optional().transform((val) => val ? val: undefined),
    certificates: z.array(
        z.object({
            certificateType: z.string().optional(),
            grade: z.string().optional(),
        })
    ).optional().transform((val) => val ?? []),
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
    ).optional().transform((val) => val ?? []),
});
