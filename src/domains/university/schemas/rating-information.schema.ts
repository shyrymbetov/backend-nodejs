import z from 'zod';

export const RatingInformationSchema = z.object({
    name: z.string(),
    information: z.string(),
});
