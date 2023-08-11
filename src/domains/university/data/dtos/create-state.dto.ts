import z from 'zod';
import {CreateStateSchema} from "../schemas/create-state.schema";

export type CreatStateDto = z.infer<typeof CreateStateSchema>['body'];
