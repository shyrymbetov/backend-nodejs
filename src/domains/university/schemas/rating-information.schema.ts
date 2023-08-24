import z from 'zod';

export const RatingInformationSchema = z.object({
    name: z.string().optional().nullable().transform((val) => val ?? undefined),
    information: z.string().optional().nullable().transform((val) => val ?? undefined),
});
