import z from 'zod';

export const UniversityCampusInformationSchema = z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    additionalDescription: z.string().optional(),
    gallery: z.array(z.string()).optional().transform((val) => val ?? []),
    additionalInformation: z.array(
        z.object({
            title: z.string().optional(),
            fields: z.array(
                z.object({
                    name: z.string().optional(),
                    count: z.string().optional(),
                })
            )
        })
    ),
});
