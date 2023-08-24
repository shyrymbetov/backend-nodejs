import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const UniversityTuitionCostSchema = z.object({
    id: z.string().transform((val) => isValidUUID(val) ? val: undefined),
    title: z.string().nullable().optional().transform((val) => val ? val: undefined),
    description: z.string().nullable().optional().transform((val) => val ? val: undefined),
    tuitionCost: z.number().positive().nullable().optional().transform((val) => val ? val: undefined),
    fullCost: z.number().positive().nullable().optional().transform((val) => val ? val: undefined),
    additionalCost: z.array(
        z.object({
            name: z.string().optional().nullable().transform((val) => val ?? undefined),
            cost: z.string().optional().nullable().transform((val) => val ?? undefined),
        })
    ).optional().transform((val) => val ?? []),
    programCost: z.array(
        z.object({
            title: z.string().optional().nullable().transform((val) => val ?? undefined),
            fields: z.array(
                z.object({
                    name: z.string().optional().nullable().transform((val) => val ?? undefined),
                    cost: z.string().optional().nullable().transform((val) => val ?? undefined),
                })
            )
        })
    ).optional().transform((val) => val ?? []),
});
