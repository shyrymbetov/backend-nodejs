import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const UniversityCampusInformationSchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    title: z.string().optional().nullable().transform((val) => val ?? undefined),
    description: z.string().optional().nullable().transform((val) => val ?? undefined),
    additionalDescription: z.string().optional().nullable().transform((val) => val ?? undefined),
    image: z.string().nullable().default(null).optional().transform((val) => val ? val: undefined),
    additionalInformation: z.array(
        z.object({
            title: z.string().optional().nullable().transform((val) => val ?? undefined),
            fields: z.array(
                z.object({
                    name: z.string().optional().nullable().transform((val) => val ?? undefined),
                    count: z.string().optional().nullable().transform((val) => val ?? undefined),
                })
            )
        })
    ).optional().transform((val) => val ?? []),
});
