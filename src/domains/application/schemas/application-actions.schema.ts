import z from 'zod';
import {ApplicationActionStatusEnum} from "../type/application-action-status.enum";
import {ApplicationStatusEnum} from "../type/application-status.enum";

export const ApplicationActionsSchema = z.object({
  body: z.object({
    applicationStatus: z.enum(['DRAFT', 'APPLICATION_RECEIVED', 'UNDER_CONSIDERATION', 'OFFER_RECEIVED', 'CONFIRMED', 'DEPARTURE'])
        .transform((val) => val ? (val as ApplicationStatusEnum) : undefined),
    actionsStatus: z.enum(['ISSUED_OFFER', 'REQUIRES_ACTION', 'REJECTED_OFFER']).optional()
        .transform((val) => val ? (val as ApplicationActionStatusEnum) : null),
    }).strict(),
  query: z.object({}).strict(),
  params: z.object({
      id: z.string().optional(),
  }).strict(),
});
