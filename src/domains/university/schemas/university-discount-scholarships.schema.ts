import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const UniversityDiscountScholarshipsSchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    title: z.string().optional(),
    description: z.string().optional(),
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
