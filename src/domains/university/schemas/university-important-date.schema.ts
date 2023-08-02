import z from 'zod';

export const UniversityImportantDateSchema = z.object({
    id: z.string().nullable().default(null),
    name: z.string().nullable().default(null),
    deadline: z.string().datetime().nullable().default(null),
    additionalDates: z.array(
        z.object({
            date: z.string().datetime().nullable().default(null),
            description: z.string().nullable().default(null)
        })
    ),
});
