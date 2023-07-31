import {dataSource} from '../../database';
import {CreateUserType} from './types/create-user.type';
import {UserEntity} from './model/university.entity';
import {UserRoleEnum} from "./types/user-role.enum";
import {CreateUserDto} from "./dtos/create-user.dto";
import { createChangePasswordLink } from "../auth/user-action-link.service";
import {ChangeUserPasswordType} from "./types/change-password.type";

const userRepository = dataSource.getRepository(UserEntity);

export async function getUsers(filter: any): Promise<UserEntity[]> {
  //
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

  const newUser = await createUser({
    email: userDto.email,
    firstName: userDto.firstName,
    lastName: userDto.lastName,
    role: role,
    birthDate: new Date(Date.parse(userDto.birthDate)),
    regionId: userDto.regionId,
    phone: userDto.phone,
    localId: userDto.localId
  });

  await sendReferralLinkToNewUser(newUser.id)

  return newUser
}

export async function editUser(id: string, userDto: CreateUserDto) {
  const role: UserRoleEnum = getRoleByType(userDto.type)
  const masterExpert = await getMasterExpert()

  if (masterExpert && masterExpert == id) {
    return await userRepository.update(id, {
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      birthDate: new Date(Date.parse(userDto.birthDate)),
      regionId: userDto.regionId,
      phone: userDto.phone,
      localId: userDto.localId
    });
  } else if (masterExpert && role == UserRoleEnum.MasterExpert) {
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

export async function updateUserPassword(userDto: ChangeUserPasswordType) {
  return await userRepository.update(userDto.userId, {
    hashedPassword: userDto.hashedPassword,
  });
}

export async function verifyUserEmail(id: string) {
  return await userRepository.update(id, {
    verified: true,
  });
}

export async function deleteUser(id: string) {
  return await userRepository.delete(id);
}

async function sendReferralLinkToNewUser(userId: string) {
  const changePasswordLink = createChangePasswordLink(userId);
  // sendMail()
  console.log(changePasswordLink)
  return "generated";
}

export async function createUser(userToCreate: CreateUserType) {
  return await userRepository.save(userToCreate);
}

