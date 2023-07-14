import { Request, Response } from 'express';
import {createNewUser, deleteUser, editUser, getUserById, getUsers} from './user.service';
import {CreateUserSchema} from "./schemas/create-user.schema";

export async function getUserHandler(req: Request, res: Response) {
  let { id } = req.params
  if (!id) {
    id = req.user?.id ?? ''
  }

  return res.send(await getUserById(id));
}

export async function getUsersHandler(req: Request, res: Response) {
  return res.send(await getUsers({}));
}

export async function createUserHandler(req: Request, res: Response) {
  const { body } = CreateUserSchema.parse(req);
  return res.send(await createNewUser(body));
}

export async function editUserHandler(req: Request, res: Response) {
  const { id } = req.params
  const { body } = CreateUserSchema.parse(req);
  console.log(id);
  console.log(body);
  return res.send(await editUser(id, body));
}

export async function deleteUserHandler(req: Request, res: Response) {
  const { id } = req.params
  console.log(id);
  return res.send(await deleteUser(id));
}
