import {dataSource} from "../../database";
import {UserEntity} from "../user/model/user.entity";
import {UserRoleEnum} from "../user/types/user-role.enum";
import {createUser, getMasterExpert, getRoleByType, getUserById} from "../user/user.service";
import {CreateStudentDto} from "./dtos/create-student.dto";
import {GetStudentsParamsDto} from "./dtos/get-student-params.dto";
import {EditStudentManagerDto} from "./dtos/edit-student-manager.dto";
import {GetApplicationsParamsDto} from "../application/dto/get-applications-params.dto";

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

    const skip = (filter.page-1) * filter.size
    const take = filter.size


    let sql = userRepository.createQueryBuilder('students')
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
        .getSql();

    sql = `${sql} LIMIT ${take} OFFSET ${skip}`;

    const data = await userRepository.query(sql);

    const totalCount = await userRepository
        .createQueryBuilder('students')
        .where(conditionString, conditionParameters)
        .getCount();


    return {
        data: data,
        totalCount: totalCount
    }
}

export async function getStudentsByMasterOrOrientatorIdWithApplications(filter: GetStudentsParamsDto, id: String) {

    let {conditionString, conditionParameters} = generateConditionsForGetStudentsWithApplication(filter, id)

    const data = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.applications', 'applications')
        .leftJoinAndSelect('applications.university', 'university')
        .select([
            'user.id',
            'user.firstName',
            'user.lastName',
            'user.email',
            'user.avatar',
            'applications.id',
            'applications.applicationStatus',
            'applications.actionsStatus',
            'university.universityName',
        ])
        .where(conditionString, conditionParameters)
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getMany();

    const totalCount = await userRepository
        .createQueryBuilder('user')
        .leftJoin('user.applications', 'applications')
        .leftJoin('applications.university', 'university')
        .where(conditionString, conditionParameters)
        .getCount();

    return {
        data: data,
        totalCount: totalCount
    }
}

function generateConditionsForGetStudentsWithApplication(filter: GetApplicationsParamsDto, id: String) {

    let conditionString = 'true '
    let conditionParameters = {}
    if (filter.country) {
        conditionString += 'and university.countryId = :country '
        conditionParameters['country'] = filter.country
    }

    if (filter.university) {
        conditionString += 'and university_id = :university '
        conditionParameters['university'] = filter.university
    }

    if (filter.semester) {
        conditionString += "and applications.specialityType ->> 'importantDayId' = :semester "
        conditionParameters['semester'] = filter.semester
    }

    if (filter.school) {
        conditionString += 'and user.school = :school '
        conditionParameters['school'] = filter.school
    }
    if (filter.expert) {
        conditionString += 'and user.masterId = :expert '
        conditionParameters['expert'] = filter.expert
    }

    if (filter.orientator) {
        conditionString += 'and user.orientatorId = :orientator '
        conditionParameters['orientator'] = filter.orientator
    }

    if (filter.studentName) {
        conditionString += 'AND (user.firstName ILIKE :studentName OR user.lastName ILIKE :studentName) ';
        conditionParameters['studentName'] = `%${filter.studentName}%`;
    }

    if (filter.applicationStatus) {
        conditionString += 'and applications.applicationStatus != :applicationStatus '
        conditionParameters['applicationStatus'] = filter.applicationStatus
    }

    conditionString += 'and applications.applicationStatus != :status AND (user.masterId = :id OR user.orientatorId = :id) '
    conditionParameters['status'] = 'DRAFT'
    conditionParameters['id'] = id

    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };


}


function generateConditionsForGetStudents(filter: GetStudentsParamsDto) {

    let conditionParameters = {
        roles: [UserRoleEnum.Schoolboy, UserRoleEnum.Student].map(type => `'${type}'`).join(','),
    }
    let conditionString = `students.role IN (${conditionParameters['roles']}) `

    if (filter.orientatorId) {
        conditionString += 'and students.orientatorId = :orientatorId '
        conditionParameters['orientatorId'] = filter.orientatorId
    }

    if (filter.masterId) {
        conditionParameters['masterId'] = filter.masterId
        conditionString += `and students.masterId = '${filter.masterId}' `
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
        newStudent["orientatorId"] = userId
    } else if(currentUser?.role == UserRoleEnum.Expert) {
        newStudent["masterId"] = userId
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
