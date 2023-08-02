import z from 'zod';

export const KeyFactsSchema = z.object({
    icon: z.string().nullable().default(null),
    description: z.string().nullable().default(null),
});
