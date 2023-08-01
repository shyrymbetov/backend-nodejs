import z from 'zod';
import {VerifyOrChangePwdSchema} from "../schemas/verify-or-change-pwd.schema";

export type VerifyOrChangePwdDto = z.infer<typeof VerifyOrChangePwdSchema>['body'];
