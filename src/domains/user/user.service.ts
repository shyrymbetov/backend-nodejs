import { getUserRepository } from '../../database';
import { CreateUserType } from './types/create-user.type';
import { UserEntity } from './user.entity';

const userRepository = getUserRepository();

export async function getUsers(): Promise<UserEntity[]> {
  return await userRepository.find();
}

export async function createUser(userToCreate: CreateUserType) {
  return await userRepository.save(userToCreate);
}

export async function getUserById(id: number): Promise<UserEntity | null> {
  return await userRepository.findOneBy({ id });
}

export async function getUserByEmail(
  email: string
): Promise<UserEntity | null> {
  return await userRepository.findOneBy({ email });
}
