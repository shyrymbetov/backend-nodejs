import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";
import {WorksheetFieldEnum} from "../../worksheet/types/worksheet-field-type.enum";
import {FieldAnswerTypeEnum} from "../../worksheet/types/field-answer-type.enum";

export const ApplicationSpecialitySchema = z.object({
    eduDegreeId: z.string().nullable().optional().transform((val) => val ?? undefined),
    facultyId: z.string().nullable().optional().transform((val) => val ?? undefined),
    specialityId: z.string().nullable().optional().transform((val) => val ?? undefined),
    importantDayId: z.string().nullable().optional().transform((val) => val ?? undefined),
});

