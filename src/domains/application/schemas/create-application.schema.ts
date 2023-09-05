import z, {string} from 'zod';
import {isValidUUID} from "../../../shared/util.service";
import {ApplicationFieldSchema} from "./application-field.schema";
import {ApplicationSpecialitySchema} from "./application-speciality.schema";
import {ApplicationStatusEnum} from "../type/application-status.enum";

export const CreateApplicationSchema = z.object({
  body: z
    .object({
        id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
        studentId: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
        universityId: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
        specialityType: ApplicationSpecialitySchema.optional(),
        applicationStatus: z.enum(['DRAFT', 'APPLICATION_RECEIVED'])
            .transform((val) => val ? (val as ApplicationStatusEnum) : undefined),
        profileFields: z.array(ApplicationFieldSchema).optional().transform((val) => val ?? []),
        contactsFields: z.array(ApplicationFieldSchema).optional().transform((val) => val ?? []),
        educationFields: z.array(ApplicationFieldSchema).optional().transform((val) => val ?? []),
        languagesFields: z.array(ApplicationFieldSchema).optional().transform((val) => val ?? []),
        recommendationsFields: z.array(ApplicationFieldSchema).optional().transform((val) => val ?? []),
        motivationFields: z.array(ApplicationFieldSchema).optional().transform((val) => val ?? []),
        documentsFields: z.array(ApplicationFieldSchema).optional().transform((val) => val ?? []),
        otherFields: z.array(ApplicationFieldSchema).optional().transform((val) => val ?? []),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
