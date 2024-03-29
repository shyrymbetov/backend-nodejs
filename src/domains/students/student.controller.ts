import { Request, Response } from 'express';
import {CreateStudentSchema} from "./schemas/create-student.schema";
import {EditStudentManagerSchema} from "./schemas/edit-student-manager.schema";
import {
    createStudent,
    editStudent,
    editStudentExpert, editStudentOrientator,
    getStudentById,
    getStudents, setManagerIdsToNewStudent,
    setManagerIdsToQuery
} from "./student.service";
import {GetStudentsFilterSchema} from "./schemas/get-students-filter.schema";
import {Unauthorized} from "http-errors";

export async function getStudentsHandler(req: Request, res: Response) {
    const {query} = GetStudentsFilterSchema.parse(req);

    if (!req.user?.id) {
        throw new Unauthorized('User not logged in');
    }
    await setManagerIdsToQuery(req.user.id, query)
    return res.send(await getStudents(query));
}

export async function getStudentHandler(req: Request, res: Response) {
    let { id } = req.params
    return res.send(await getStudentById(id));
}

export async function createStudentHandler(req: Request, res: Response) {

    if (!req.user?.id) {
        throw new Unauthorized('User not logged in');
    }

    const { body } = CreateStudentSchema.parse(req);
    await setManagerIdsToNewStudent(req.user.id, body)

    return res.send(await createStudent(body));
}

export async function editStudentHandler(req: Request, res: Response) {
    const { id } = req.params
    const { body } = CreateStudentSchema.parse(req);
    return res.send(await editStudent(id, body));
}

export async function editStudentOrientatorHandler(req: Request, res: Response) {
    const { body } = EditStudentManagerSchema.parse(req);
    return res.send(await editStudentOrientator(body));
}

export async function editStudentExpertHandler(req: Request, res: Response) {
    const { body } = EditStudentManagerSchema.parse(req);
    return res.send(await editStudentExpert(body));
}
