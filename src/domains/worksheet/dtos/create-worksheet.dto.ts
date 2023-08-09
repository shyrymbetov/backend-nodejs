import z from 'zod';
import {CreateWorksheetSchema} from "../schemas/create-worksheet.schema";

export type CreateWorksheetDto = z.infer<typeof CreateWorksheetSchema>['body'];
