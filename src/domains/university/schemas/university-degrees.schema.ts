import z from 'zod';
import {EduDegreeEnum} from "../types/edu-degree.enum";
import {UniversitySpecialityEntity} from "../data/model/university-speciality.entity";
import {ScholarshipEnum} from "../types/scholarship.enum";
import {isValidUUID} from "../../../shared/util.service";
export const UniversitySpecialitySchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    name: z.string().optional().nullable().transform((val) => val ?? undefined),
    minCost: z.number().optional().nullable().transform((val) => val ?? undefined),
    maxCost: z.number().optional().nullable().transform((val) => val ?? undefined),
    directions: z.array(z.string()).optional().transform((val) => val ?? []),
});

export const UniversityFacultySchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    name: z.string().optional().nullable().transform((val) => val ?? undefined),
    specialities: z.array(UniversitySpecialitySchema).optional().transform((val) => val ?? []),
});

export const UniversityDegreeSchema = z.object({
    id: z.string().optional().transform((val) => isValidUUID(val) ? val: undefined),
    degree: z.enum(['BACHELOR', 'MASTERS_DEGREE', 'LANGUAGE_PROGRAM', 'FOUNDATION', 'DEGREE_PREPARATION',]).nullable().transform((val) => val ? (val as EduDegreeEnum) : undefined),
    description: z.string().optional().nullable().transform((val) => val ?? undefined),
    faculties: z.array(UniversityFacultySchema).optional().transform((val) => val ?? []),
});



