import z from 'zod';

export const UniversityAdmissionRequirementsSchema = z.object({
    id: z.string().nullable().default(null),
    title: z.string().nullable().default(null),
    description: z.string().nullable().default(null),
    certificates: z.array(
        z.object({
            certificateType: z.string().nullable().default(null),
            grade: z.string().nullable().default(null),
        })
    ),
    requirements: z.array(
        z.object({
            title: z.string().nullable().default(null),
            fields: z.array(
                z.object({
                    name: z.string().nullable().default(null),
                    grade: z.string().nullable().default(null),
                })
            )
        })
    ),
});
