import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const UniversityTuitionCostSchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    title: z.string().nullable().optional().transform((val) => val ? val: undefined),
    description: z.string().nullable().optional().transform((val) => val ? val: undefined),
    tuitionCost: z.number().positive().nullable().optional().transform((val) => val ? val: undefined),
    fullCost: z.number().positive().nullable().optional().transform((val) => val ? val: undefined),
    additionalCost: z.array(
        z.object({
            name: z.string().optional(),
            cost: z.string().optional(),
        })
    ).optional().transform((val) => val ?? []),
    programCost: z.array(
        z.object({
            title: z.string().optional(),
            fields: z.array(
                z.object({
                    name: z.string().optional(),
                    cost: z.string().optional(),
                })
            )
        })
    ).optional().transform((val) => val ?? []),
});
