import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";

export const UniversityCampusInformationSchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
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
