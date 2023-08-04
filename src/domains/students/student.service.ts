import {dataSource} from "../../database";
import {UserEntity} from "../user/model/user.entity";
import {UserRoleEnum} from "../user/types/user-role.enum";
import {createUser, getMasterExpert, getRoleByType, getUserById} from "../user/user.service";
import {CreateStudentDto} from "./dtos/create-student.dto";
import {GetStudentsParamsDto} from "./dtos/get-student-params.dto";
import {ChangeUserPasswordType} from "../user/types/change-password.type";
import {EditStudentManagerDto} from "./dtos/edit-student-manager.dto";

const userRepository = dataSource.getRepository(UserEntity);

export async function setManagerIdsToQuery(userId: string, query: GetStudentsParamsDto) {
    const currentUser = await getUserById(userId);

    if(currentUser?.role == UserRoleEnum.Orientator) {
        query.orientatorId = userId
    } else if(currentUser?.role == UserRoleEnum.Expert) {
        query.masterId = userId
    }

}

export async function getStudents(filter: GetStudentsParamsDto): Promise<any> {
    const { conditionString, conditionParameters } = generateConditionsForGetStudents(filter)

    const data = await userRepository.createQueryBuilder('students')
        .select([
            'students.id as id',
            'students.avatar as avatar',
            'students.email as email',
            'students.active as active',
            'students.firstName as firstName',
            'students.lastName as lastName',
            'students.orientatorId as orientatorId',
            'students.masterId as masterId',
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

function generateConditionsForGetStudents(filter: GetStudentsParamsDto) {
    let conditionString = 'students.role IN (:...roles) '
    let conditionParameters = {
        roles: [UserRoleEnum.Schoolboy, UserRoleEnum.Student],
    }

    if (filter.orientatorId) {
        conditionString += 'and students.orientatorId = :orientatorId '
        conditionParameters['orientatorId'] = filter.orientatorId
    }

    if (filter.masterId) {
        conditionString += 'and students.masterId = :masterId '
        conditionParameters['masterId'] = filter.masterId
    }

    if (filter.localId) {
        conditionString += 'and students.localId = :localId '
        conditionParameters['localId'] = filter.localId
    }

    if (filter.school) {
        conditionString += 'and students.school = :school '
        conditionParameters['school'] = filter.school
    }
    if (filter.class) {
        conditionString += 'and students.class = :class '
        conditionParameters['class'] = filter.class
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

export async function getStudentById(id: string): Promise<any | null> {
    return await userRepository.findOne({
        where: { id: id },
        relations: ['orientator', 'master']
    } );
}

export async function setManagerIdsToNewStudent(userId: string, newStudent: CreateStudentDto) {
    const currentUser = await getUserById(userId);

    if(currentUser?.role == UserRoleEnum.Orientator) {
        newStudent.orientatorId = userId
    } else if(currentUser?.role == UserRoleEnum.Expert) {
        newStudent.masterId = userId
    }

}

export async function createStudent(userDto: CreateStudentDto) {
    const role: UserRoleEnum = getRoleByType(userDto.type)
    const masterExpert = await getMasterExpert();

    let user = {
        email: userDto.email,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        birthDate: new Date(Date.parse(userDto.birthDate)),
        regionId: userDto.regionId,
        phone: userDto.phone,
        localId: userDto.localId,
        school: userDto.school ?? null,
        class: userDto.class ?? null,
        masterId: userDto['masterId'] ? userDto['masterId'] : masterExpert,
        orientatorId: userDto['orientatorId'] ?? null,
        role: role,
    }

    return await createUser(user);
}

export async function editStudent(id: string, userDto: CreateStudentDto) {
    const student = await getStudentById(id)

    if (student.active) {
        return "student active";
    }

    // if (masterExpert) {}
    const role: UserRoleEnum = getRoleByType(userDto.type)
    let userEditInfo = {
        email: userDto.email,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        birthDate: new Date(Date.parse(userDto.birthDate)),
        regionId: userDto.regionId,
        phone: userDto.phone,
        localId: userDto.localId,
        school: userDto.school ?? null,
        class: userDto.class ?? null,
        role: role,
    }

    return await userRepository.update(id, userEditInfo);
}

export async function editStudentOrientator(userDto: EditStudentManagerDto) {
    return await userRepository.update(userDto.studentId, {
        orientatorId: userDto.managerId,
    });
}
export async function editStudentExpert(userDto: EditStudentManagerDto) {
    return await userRepository.update(userDto.studentId, {
        masterId: userDto.managerId,
    });
}
