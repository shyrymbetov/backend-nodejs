import {dataSource} from '../../database';
import {CreateUserType} from './types/create-user.type';
import {UserEntity} from './user.entity';
import {UserRoleEnum} from "./types/user-role.enum";
import {CreateUserDto} from "./dtos/create-user.dto";
import {LoginUserDto} from "../auth/dtos/login-user.dto";

const userRepository = dataSource.getRepository(UserEntity);

export async function getUsers(filter: any): Promise<UserEntity[]> {
  return await userRepository.find({where: filter});
}

export async function getUserById(id: string): Promise<UserEntity | null> {
  return await userRepository.findOneBy({ id: id });
}

export async function existUserByEmail(email: string): Promise<boolean> {
  return await userRepository.exist( {where: { email: email }});
}

export async function getUserByEmail(email: string ): Promise<UserEntity | null> {
  return await userRepository.findOneBy({ email: email });
}

export async function getMasterExpert(): Promise<string | null> {
  const user = await userRepository.findOneBy({ role: UserRoleEnum.MasterExpert })
  return user?.id ? user.id : null;
}

export function getRoleByType(type: string): UserRoleEnum {
  return type as UserRoleEnum;
}

export async function createNewUser(userDto: CreateUserDto) {
  const role: UserRoleEnum = getRoleByType(userDto.type)
  const masterExpert = await getMasterExpert()
  //userDto.status(400).send('Master Expert exists')
  if (masterExpert && role == UserRoleEnum.MasterExpert) {
    return;
  }

  return await createUser({
    email: userDto.email,
    firstName: userDto.firstName,
    lastName: userDto.lastName,
    role: role,
    birthDate: new Date(Date.parse(userDto.birthDate)),
    regionId: userDto.regionId,
    phone: userDto.phone,
    localId: userDto.localId
  });
}

export async function editUser(id: string, userDto: CreateUserDto) {
  const role: UserRoleEnum = getRoleByType(userDto.type)
  const masterExpert = await getMasterExpert()

  if (masterExpert && role == UserRoleEnum.MasterExpert) {
    return ;
  }

  return await userRepository.update(id, {
    email: userDto.email,
    firstName: userDto.firstName,
    lastName: userDto.lastName,
    role: role,
    birthDate: new Date(Date.parse(userDto.birthDate)),
    regionId: userDto.regionId,
    phone: userDto.phone,
    localId: userDto.localId
  });
}

export async function updateUserPassword(userDto: LoginUserDto) {
  const user = await getUserByEmail(userDto.email);
  if (!user) { return ; }

  return await userRepository.update(user.id, {
    hashedPassword: userDto.password,
  });
}

export async function deleteUser(id: string) {
  return await userRepository.delete(id);
}

export async function createUser(userToCreate: CreateUserType) {
  return await userRepository.save(userToCreate);
}

