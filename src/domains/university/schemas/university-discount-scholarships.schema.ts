import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const UniversityDiscountScholarshipsSchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    title: z.string().nullable().optional().transform((val) => val ? val: undefined),
    description: z.string().nullable().optional().transform((val) => val ? val: undefined),
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
