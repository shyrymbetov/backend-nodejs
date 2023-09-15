import z from 'zod';
import {ApplicationStatusEnum} from "../type/application-status.enum";

export const GetApplicationsFilterSchema = z.object({
  body: z.object({}).strict(),
  query: z.object({
      page: z.string().regex(/^\d+$/).transform(Number),
      size: z.string().regex(/^\d+$/).transform(Number),
      studentName: z.string().optional(),
      country: z.string().optional(),
      university: z.string().optional(),
      semester: z.string().optional(),
      school: z.string().optional(),
      expert: z.string().optional(),
      orientator: z.string().optional(),
      fall: z.string().optional(),
      status: z.string().optional(),
      applicationStatus: z.enum(['APPLICATION_RECEIVED', 'UNDER_CONSIDERATION', 'OFFER_RECEIVED', 'CONFIRMED', 'DEPARTURE'])
          .transform((val) => val ? (val as ApplicationStatusEnum) : undefined).optional(),
  }).strict(),
  params: z.object({}),
});
