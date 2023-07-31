import {Request, Response} from 'express';
import {
    createNewUser,
    deleteUser,
    editCurrentUser,
    editUser,
    getUserById,
    getUsers,
    getUserStudents
} from './user.service';
import {CreateUserSchema} from "./schemas/create-user.schema";
import {EditCurrentUserSchema} from "./schemas/edit-current-user.schema";
import {GetUsersFilterSchema} from "./schemas/get-users-filter.schema";
import {GetUserStudentsFilterSchema} from "./schemas/get-user-students-filter.schema";

export async function getUserHandler(req: Request, res: Response) {
    const {id} = req.params
    return res.send(await getUserById(id));
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    const id = req.user?.id ?? ''
    return res.send(await getUserById(id));
}

export async function getUsersHandler(req: Request, res: Response) {
    const {query} = GetUsersFilterSchema.parse(req);
    return res.send(await getUsers(query));
}

export async function getUserStudentsHandler(req: Request, res: Response) {
    const {params,query} = GetUserStudentsFilterSchema.parse(req);
    return res.send(await getUserStudents(params.id, query));
}

export async function createUserHandler(req: Request, res: Response) {
    const {body} = CreateUserSchema.parse(req);
    return res.send(await createNewUser(body));
}

export async function editUserHandler(req: Request, res: Response) {
    const {body, params} = CreateUserSchema.parse(req);
    return res.send(await editUser(params.id, body));
}

export async function editCurrentUserHandler(req: Request, res: Response) {
    const id = req.user?.id ?? ''
    const {body} = EditCurrentUserSchema.parse(req);
    return res.send(await editCurrentUser(id, body));
}

export async function deleteUserHandler(req: Request, res: Response) {
    const {id} = req.params
    console.log(id);
    return res.send(await deleteUser(id));
}
