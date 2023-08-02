import z from 'zod';
import {EduDegreeEnum} from "../types/edu-degree.enum";
import {UniversitySpecialityEntity} from "../data/model/university-speciality.entity";

export const UniversityDegreeSchema = z.object({
    id: z.string().nullable().default(null),
    degree: z.enum(Object.values(EduDegreeEnum)),
    description: z.string().nullable().default(null),
    faculties: z.array(UniversityFacultySchema).optional().transform((val) => val ?? []),
});

export const UniversityFacultySchema = z.object({
    id: z.string().nullable().default(null),
    name: z.string().nullable().default(null),
    specialities: z.array(UniversitySpecialitySchema).optional().transform((val) => val ?? []),
});

export const UniversitySpecialitySchema = z.object({
    id: z.string().nullable().default(null),
    name: z.string().nullable().default(null),
    minCost: z.number().nullable().default(null),
    maxCost: z.number().nullable().default(null),
    directions: z.array(z.string()).optional().transform((val) => val ?? []),
    specialities: UniversitySpecialityEntity,
});
