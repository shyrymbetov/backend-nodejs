import z from 'zod';

export const UniversityTuitionCostSchema = z.object({
    id: z.string().nullable().default(null).optional(),
    title: z.string().nullable().default(null),
    description: z.string().nullable().default(null),
    tuitionCost: z.number().positive().nullable().default(null),
    fullCost: z.number().positive().nullable().default(null),
    additionalCost: z.array(
        z.object({
            name: z.string().nullable().default(null),
            grade: z.string().nullable().default(null),
        })
    ),
    programCost: z.array(
        z.object({
            title: z.string().nullable().default(null),
            fields: z.array(
                z.object({
                    name: z.string().nullable().default(null),
                    cost: z.string().nullable().default(null),
                })
            )
        })
    ),
});
