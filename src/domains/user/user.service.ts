import { getUserRepository } from '../../database';
import { CreateUserType } from './types/create-user.type';
import { UserEntity } from './user.entity';

const userRepository = getUserRepository();

export async function getUsers(): Promise<UserEntity[]> {
  return await userRepository.find();
}

export async function createUser(userToCreate: CreateUserType) {
  const createduser = userRepository.create(userToCreate);

  return await userRepository.save(createduser);
}

export async function getUserById(id: number): Promise<UserEntity | null> {
  return await userRepository.findOneBy({ id });
}

export async function getUserByEmail(
  email: string
): Promise<UserEntity | null> {
  return await userRepository.findOneBy({ email });
}
