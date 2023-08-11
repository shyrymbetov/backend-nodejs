import z from 'zod';

export const KeyFactsSchema = z.object({
    icon: z.string(),
    description: z.string(),
});
