import z from 'zod';

export const RatingInformationSchema = z.object({
    name: z.string().nullable().default(null),
    information: z.string().nullable().default(null),
});
