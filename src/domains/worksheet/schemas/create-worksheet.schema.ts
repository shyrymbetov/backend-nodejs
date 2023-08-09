import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";
import {WorksheetFieldSchema} from "./worksheet-field.schema";

export const CreateWorksheetSchema = z.object({
  body: z
    .object({
        id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
        universityId: z.string(),
        profileFields: z.array(WorksheetFieldSchema).optional().transform((val) => val ?? []),
        contactsFields: z.array(WorksheetFieldSchema).optional().transform((val) => val ?? []),
        educationFields: z.array(WorksheetFieldSchema).optional().transform((val) => val ?? []),
        languagesFields: z.array(WorksheetFieldSchema).optional().transform((val) => val ?? []),
        recommendationsFields: z.array(WorksheetFieldSchema).optional().transform((val) => val ?? []),
        motivationFields: z.array(WorksheetFieldSchema).optional().transform((val) => val ?? []),
        documentsFields: z.array(WorksheetFieldSchema).optional().transform((val) => val ?? []),
        otherFields: z.array(WorksheetFieldSchema).optional().transform((val) => val ?? []),
    })
    .strict(),
  query: z.object({}).strict(),
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
