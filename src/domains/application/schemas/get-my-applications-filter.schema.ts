import z from 'zod';
import {ApplicationStatusEnum} from "../type/application-status.enum";

export const GetMyApplicationsFilterSchema = z.object({
  body: z.object({}).strict(),
  query: z.object({
      applicationStatus: z.enum(['DRAFT', 'APPLICATION_RECEIVED', 'UNDER_CONSIDERATION', 'OFFER_RECEIVED', 'CONFIRMED', 'DEPARTURE'])
          .transform((val) => val ? (val as ApplicationStatusEnum) : undefined).optional(),
  }).strict(),
  params: z.object({}),
});
