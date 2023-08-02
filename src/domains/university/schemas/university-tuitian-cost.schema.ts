import z from 'zod';

export const UniversityTuitionCostSchema = z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    tuitionCost: z.number().positive().optional(),
    fullCost: z.number().positive().optional(),
    additionalCost: z.array(
        z.object({
            name: z.string().optional(),
            cost: z.string().optional(),
        })
    ),
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
    ),
});
