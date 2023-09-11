import {dataSource} from '../../database';
import {UserEntity} from './model/user.entity';
import {UserRoleEnum} from "./types/user-role.enum";
import {CreateUserDto} from "./dtos/create-user.dto";
import {createChangePasswordLink} from "../auth/user-action-link.service";
import {ChangeUserPasswordType} from "./types/change-password.type";
import {CreateUserType} from "./types/create-user.type";
import {EditCurrentUserDto} from "./dtos/edit-user.dto";
import {GetUsersParamsDto} from "./dtos/get-user-params.dto";
import {GetUserStudentsParamsDto} from "./dtos/get-user-student-params.dto";
import {sendMailMessage} from "../mail/mail.service";

const userRepository = dataSource.getRepository(UserEntity);

export async function getUsers(filter: GetUsersParamsDto): Promise<any> {

    const { conditionString, conditionParameters } = generateConditionsForGetUser(filter)

    const data = await userRepository.createQueryBuilder('managers')
        .leftJoinAndSelect('managers.orientatorStudents', 'orientatorStudents')
        .leftJoinAndSelect('managers.masterStudents', 'masterStudents')
        .select([
            'managers.id as id',
            'managers.avatar as avatar',
            'managers.firstName as firstName',
            'managers.lastName as lastName',
            'managers.active as active',
            'managers.role as role',
            '(COUNT(orientatorStudents.id) + COUNT(masterStudents.id)) as stuCount',
            '(SUM(CASE WHEN orientatorStudents.role = :schoolboyRole THEN 1 ELSE 0 END) + ' +
            'SUM(CASE WHEN masterStudents.role = :schoolboyRole THEN 1 ELSE 0 END)) as schoolboyCount',
            '(SUM(CASE WHEN orientatorStudents.role = :studentRole THEN 1 ELSE 0 END) + ' +
            'SUM(CASE WHEN masterStudents.role = :studentRole THEN 1 ELSE 0 END)) as studentCount',
        ])
        .where(conditionString, conditionParameters)
        .setParameter('schoolboyRole', UserRoleEnum.Schoolboy)
        .setParameter('studentRole', UserRoleEnum.Student)
        .groupBy('managers.id')
        .addGroupBy('managers.firstName')
        .addGroupBy('managers.lastName')
        .addGroupBy('managers.active')
        .orderBy('stuCount', 'DESC')
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getRawMany();

    const totalCount = await userRepository
        .createQueryBuilder('managers')
        .where(conditionString, conditionParameters)
        .getCount();


  return {
      data: data,
      totalCount: totalCount
  }
}

function generateConditionsForGetUser(filter: GetUsersParamsDto) {
    let conditionString = 'true '
    let conditionParameters = {}
    if (filter.roles) {
        conditionString += 'and managers.role IN (:...roles) '
        conditionParameters['roles'] = filter.roles
    }

    if (filter.search) {
        conditionString += 'and LOWER(managers.firstName || \' \' || managers.lastName) like :name '
        conditionParameters['name'] = `%${filter.search.toLowerCase()}%`
    }

    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };
}

export async function getUserStudents(userId: string, filter: GetUserStudentsParamsDto): Promise<any> {
    const { conditionString, conditionParameters } = generateConditionsForGetUserStudents(userId, filter)

    const data = await userRepository.createQueryBuilder('students')
        .leftJoinAndSelect('students.orientator', 'orientator')
        .leftJoinAndSelect('students.master', 'master')
        .select([
            'students.id as id',
            'students.avatar as avatar',
            'students.firstName as firstName',
            'students.lastName as lastName',
            'students.role as role',
            'orientator.id as orientatorId',
            'master.id as masterId',
            'CONCAT(orientator.firstName, \' \', orientator.lastName) as orientator',
            'CONCAT(master.firstName, \' \', master.lastName) as master',
        ])
        .where(conditionString, conditionParameters)
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getRawMany();

    const totalCount = await userRepository
        .createQueryBuilder('students')
        .where(conditionString, conditionParameters)
        .getCount();


  return {
      data: data,
      totalCount: totalCount
  }
}

function generateConditionsForGetUserStudents(userId: string, filter: GetUserStudentsParamsDto) {
    let conditionString = 'students.role IN (:...roles) ' +
        'and ((students.orientatorId in (:...managerIds))' +
        'or (students.masterId in (:...managerIds)))'

    const managerIds = [userId];
    if (filter.managerId) {
        managerIds.push(filter.managerId)
    }

    let conditionParameters = {
        roles: [UserRoleEnum.Schoolboy, UserRoleEnum.Student],
        managerIds: managerIds,
    }

    if (filter.search) {
        conditionString += 'and LOWER(students.firstName || \' \' || students.lastName) like :name '
        conditionParameters['name'] = `%${filter.search.toLowerCase()}%`
    }

    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };
}

export async function getUserById(id: string): Promise<UserEntity | null> {
  return await userRepository.findOneBy({ id: id });
}

export async function existUserByEmail(email: string): Promise<boolean> {
    return await userRepository.exist({where: {email: email}});
}

export async function getUserByEmail(email: string): Promise<UserEntity | null> {
    return await userRepository.findOneBy({email: email});
}

export async function getUserByEmailWithPassword(email: string): Promise<UserEntity> {
    return await userRepository.findOneOrFail({
        where: {email: email},
        select: ["id", "email", "verified", "hashedPassword"]
    });
}

export async function getMasterExpert(): Promise<string | null> {
    const user = await userRepository.findOneBy({role: UserRoleEnum.MasterExpert})
    return user?.id ? user.id : null;
}

export function getRoleByType(type: string): UserRoleEnum {
    return type as UserRoleEnum;
}

export async function createNewUser(userDto: CreateUserDto) {
    const role: UserRoleEnum = getRoleByType(userDto.type)
    const masterExpert = await getMasterExpert()

    if (masterExpert && role == UserRoleEnum.MasterExpert) {
        return;
    }

    const newUser = await createUser({
        avatar: userDto.avatar ?? undefined,
        email: userDto.email,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        role: role,
        birthDate: new Date(Date.parse(userDto.birthDate)),
        regionId: userDto.regionId,
        phone: userDto.phone,
        localId: userDto.localId
    });

    await sendReferralLinkToNewUser(newUser.email, newUser.id)

    return newUser
}

export async function editUser(id: string, userDto: CreateUserDto) {
    const role: UserRoleEnum = getRoleByType(userDto.type)
    const masterExpert = await getMasterExpert()
    let userEditInfo

    if (masterExpert && masterExpert == id) {
        // Master Expert role email will not be change
        userEditInfo = {
            avatar: userDto.avatar,
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            birthDate: new Date(Date.parse(userDto.birthDate)),
            regionId: userDto.regionId,
            phone: userDto.phone,
            localId: userDto.localId
        }
    } else if (masterExpert && role == UserRoleEnum.MasterExpert) {
        // If someone want to edit any user to Master Expert
        return;
    } else {
        userEditInfo = {
            avatar: userDto.avatar,
            email: userDto.email,
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            role: role,
            birthDate: new Date(Date.parse(userDto.birthDate)),
            regionId: userDto.regionId,
            phone: userDto.phone,
            localId: userDto.localId
        }
    }

    return await userRepository.update(id, userEditInfo);
}

export async function editCurrentUser(id: string, userDto: EditCurrentUserDto) {
    let userEditInfo

    userEditInfo = {
        avatar: userDto.avatar,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        birthDate: new Date(Date.parse(userDto.birthDate)),
        regionId: userDto.regionId,
        phone: userDto.phone,
        localId: userDto.localId,
        school: userDto.school ?? null,
        class: userDto.class ?? null,
    }

    return await userRepository.update(id, userEditInfo);
}

export async function updateUserPassword(userDto: ChangeUserPasswordType) {
    return await userRepository.update(userDto.userId, {
        active: true,
        verified: true,
        hashedPassword: userDto.hashedPassword,
    });
}

export async function verifyUserEmail(id: string, email: string) {
    return await userRepository.update(id, {
        email: email,
        active: true,
        verified: true,
    });
}

export async function deleteUser(id: string) {
    return await userRepository.delete(id);
}

async function sendReferralLinkToNewUser(email:string, userId: string) {
    const changePasswordLink = createChangePasswordLink(userId);

    await sendMailMessage({
        to: email,
        subject: 'Password Change Link',
        html: `/generate-pwd/${changePasswordLink}`
    })
    console.log(changePasswordLink)
    return "generated";
}

export async function createUser(userToCreate: CreateUserType) {
    const newUser = await userRepository.save(userToCreate);
    newUser.hashedPassword = ''
    return newUser
}

