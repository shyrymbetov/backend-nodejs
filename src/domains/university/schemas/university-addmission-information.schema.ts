import z from 'zod';

export const UniversityAdmissionInformationSchema = z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    admissionSteps: z.array(
        z.object({
            index: z.number().positive(),
            name: z.string().optional(),
            description: z.string().optional()
        })
    ),
});
