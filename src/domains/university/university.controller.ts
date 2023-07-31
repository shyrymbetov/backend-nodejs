import { Request, Response } from 'express';
import {createNewUniversity, deleteUniversity, editUser, getUserById, getUsers} from './university.service';

export async function getUniversityHandler(req: Request, res: Response) {
  let { id } = req.params
  if (!id) {
    id = req.user?.id ?? ''
  }

  return res.send(await getUniversityById(id));
}

export async function getUniversitiesHandler(req: Request, res: Response) {
  return res.send(await getUniversitys({}));
}

export async function createUniversityHandler(req: Request, res: Response) {
  const { body } = CreateUniversitySchema.parse(req);
  return res.send(await createNewUniversity(body));
}

export async function editUniversityHandler(req: Request, res: Response) {
  const { id } = req.params
  const { body } = CreateUniversitySchema.parse(req);
  return res.send(await editUniversity(id, body));
}

export async function deleteUniversityHandler(req: Request, res: Response) {
  const { id } = req.params
  console.log(id);
  return res.send(await deleteUniversity(id));
}
