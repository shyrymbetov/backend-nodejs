import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";
import {WorksheetFieldEnum} from "../types/worksheet-field-type.enum";
import {FieldAnswerTypeEnum} from "../types/field-answer-type.enum";

export const WorksheetFieldSchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    type: z.enum(['NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM',])
        .transform((val) => val ? (val as WorksheetFieldEnum) : undefined) ,
    placeholder: z.string().optional(),
    description: z.string().optional(),
    title: z.string().nullable().optional(),
    required: z.boolean(),
    isFirstOptionEmpty: z.boolean().nullable().optional(),
    isCheckedByDefault: z.boolean().nullable().optional(),
    isMultipleUpload: z.boolean().nullable().optional(),
    textLimitation: z.object({
        minWords: z.number().optional(),
        maxWords: z.number().optional(),
        minChar: z.number().optional(),
        maxChar: z.number().optional(),
    }).nullable().optional(),
    options: z.array(z.string()).optional().transform((val) => val ?? []),
    answerType: z.enum(['SINGLE', 'MULTIPLE']).nullable().transform((val) => val ? (val as FieldAnswerTypeEnum) : undefined),
    text: z.string().nullable().optional(),
    dateFormat: z.string().nullable().optional(),
    quantity: z.object({
        defaultValue: z.number().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
        step: z.number().optional(),
    }).nullable().optional(),
    content: z.string().nullable().optional(),
});

