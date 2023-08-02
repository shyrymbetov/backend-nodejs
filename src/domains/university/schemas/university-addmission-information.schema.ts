import z from 'zod';

export const UniversityAdmissionInformationSchema = z.object({
    id: z.string().nullable().default(null),
    title: z.string().nullable().default(null),
    description: z.string().nullable().default(null),
    admissionSteps: z.array(
        z.object({
            index: z.number().positive(),
            name: z.string().nullable().default(null),
            description: z.string().nullable().default(null)
        })
    ),
});
