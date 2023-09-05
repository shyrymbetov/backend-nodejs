import z from 'zod';
import {isValidUUID} from "../../../shared/util.service";
import {WorksheetFieldEnum} from "../../worksheet/types/worksheet-field-type.enum";
import {FieldAnswerTypeEnum} from "../../worksheet/types/field-answer-type.enum";
import {Column, PrimaryGeneratedColumn} from "typeorm";
import {TextLimitationType} from "../../worksheet/types/text-limitation.type";
import {QuantityType} from "../../worksheet/types/quantity.type";

export const ApplicationFieldSchema = z.object({
    id: z.string().optional(),
    worksheetFieldId: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    type: z.enum(['NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM','TEXT'])
        .transform((val) => (val as WorksheetFieldEnum)) ,
    fieldValue: z.string().nullable().optional(),
    placeholder: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    index: z.number(),
    required: z.boolean(),
    isMultipleUpload: z.boolean().nullable().optional(),
    isFirstOptionEmpty: z.boolean().nullable().optional(),
    isDescription: z.boolean().nullable().optional(),
    isCheckedByDefault: z.boolean().nullable().optional(),
    textLimitation: z.object({
        minWords: z.number().optional(),
        maxWords: z.number().optional(),
        minChar: z.number().optional(),
        maxChar: z.number().optional(),
    }).nullable().optional(),
    options: z.array(z.string()).optional().transform((val) => val ?? []),
    answerType: z.enum(['SINGLE', 'MULTIPLE']).nullable().optional().transform((val) => val ? (val as FieldAnswerTypeEnum) : undefined),
    text: z.string().nullable().optional(),
    dateFormat: z.string().nullable().optional(),
    quantity: z.object({
        defaultValue: z.number().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
        step: z.number().optional(),
    }).nullable().optional(),
    content: z.string().nullable().optional().transform((val) => val ?? null),
    // applicationId: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
});

