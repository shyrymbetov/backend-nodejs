import z from 'zod';

export const KeyFactsSchema = z.object({
    icon: z.string().optional().nullable().transform((val) => val ?? undefined),
    description: z.string().optional().nullable().transform((val) => val ?? undefined),
});
