import {dataSource} from '../../database';
import {ApplicationEntity} from "./model/application.entity";
import {GetApplicationsParamsDto} from "./dto/get-applications-params.dto";
import {CreateApplicationDto} from "./dto/create-application.dto";
import {ApplicationActionsDto} from "./dto/application-actions.dto";
import {getStudentsByMasterOrOrientatorIdWithApplications} from "../students/student.service"
import z from "zod";
import {WorksheetEntity} from "../worksheet/model/worksheet.entity";

const applicationRepository = dataSource.getRepository(ApplicationEntity);

export async function getApplication(id: string): Promise<ApplicationEntity | null> {
    return await applicationRepository
        .createQueryBuilder('application')
        .leftJoinAndSelect('application.university', 'university')
        .where('university.id = :id', {id})
        .getOne();
}

export async function getApplicationById(id: string): Promise<ApplicationEntity | null> {
    return await applicationRepository.findOneBy({id: id});
}

export async function getApplications(filter: GetApplicationsParamsDto): Promise<any> {

    const {conditionString, conditionParameters} = generateConditionsForGetApplication(filter)

    const data = await applicationRepository.createQueryBuilder('application')
        .leftJoinAndSelect('managers.university', 'university')
        .select([
            'managers.id as id',
            'managers.avatar as avatar',
        ])
        .where(conditionString, conditionParameters)
        .orderBy('createdAt', 'DESC')
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getRawMany();

    const totalCount = await applicationRepository
        .createQueryBuilder('application')
        .where(conditionString, conditionParameters)
        .getCount();


    return {
        data: data,
        totalCount: totalCount
    }
}

export async function getStudentApllicationById(studentId: string): Promise<any> {

    return await applicationRepository.createQueryBuilder('application')
        .leftJoinAndSelect('application.student', 'student')
        .leftJoinAndSelect('student.applications', 'applications')
        .where('application.student_id = :id', {id: studentId})
        .getMany()
}

export async function getStudentApplicationByIdWithPagination(filter: GetApplicationsParamsDto, studentId: string): Promise<any> {

    const data = await applicationRepository.createQueryBuilder('application')
        .where('application.student_id = :id', {id: studentId})

        // .where(conditionString, conditionParameters)
        .orderBy('created_at', 'DESC')
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getRawMany();

    const totalCount = await applicationRepository
        .createQueryBuilder('application')
        .where('application.student_id = :id', {id: studentId})
        .getCount();


    return {
        data: data,
        totalCount: totalCount
    }
}

export async function getMyStudentsApplicationsWithPagination(filter: GetApplicationsParamsDto, expertId: string): Promise<any> {
    return await getStudentsByMasterOrOrientatorIdWithApplications(filter, expertId)
}

export async function getMyStudentsApplicationsDraft(filter: GetApplicationsParamsDto, expertId: string): Promise<any> {

    let {conditionString, conditionParameters} = generateConditionsForGetApplicationForDraft(filter, expertId)


    const data = await applicationRepository
        .createQueryBuilder('application')
        .leftJoinAndSelect('application.student', 'student')
        .leftJoinAndSelect('application.university', 'university')
        .addSelect([
            'application.specialityType->>\'eduDegreeId\' AS eduDegreeId',
            'application.specialityType->>\'facultyId\' AS facultyId',
            'application.specialityType->>\'specialityId\' AS specialityId',
            'application.specialityType->>\'importantDayId\' AS importantDayId',
        ])
        .select([
            'application.id',
            'application.applicationStatus',
            'application.actionsStatus',
            'application.createdAt',
            'university.id',
            'application.specialityType',
            'university.universityName',
            'student.lastName',
            'student.firstName',
            'student.avatar',
        ])
        .where(conditionString, conditionParameters)
        .getMany()

    const totalCount = await applicationRepository
        .createQueryBuilder('application')
        .leftJoinAndSelect('application.student', 'student')
        .leftJoinAndSelect('application.university', 'university')
        .where(conditionString, conditionParameters)
        .getCount();

    return {
        data: data,
        totalCount: totalCount
    }
}

function generateConditionsForGetApplication(filter: GetApplicationsParamsDto) {

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
        conditionString += "and application.specialityType ->> 'importantDayId' = :semester "
        conditionParameters['semester'] = filter.semester
    }

    if (filter.school) {
        conditionString += 'and student.school = :school '
        conditionParameters['school'] = filter.school
    }
    if (filter.expert) {
        conditionString += 'and student.masterId = :expert '
        conditionParameters['expert'] = filter.expert
    }

    if (filter.orientator) {
        conditionString += 'and student.orientatorId = :orientator '
        conditionParameters['orientator'] = filter.orientator
    }

    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };
}


function generateConditionsForGetApplicationForDraft(filter: GetApplicationsParamsDto, expertId: string) {

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
        conditionString += "and application.specialityType ->> 'importantDayId' = :semester "
        conditionParameters['semester'] = filter.semester
    }

    if (filter.school) {
        conditionString += 'and student.school = :school '
        conditionParameters['school'] = filter.school
    }
    if (filter.expert) {
        conditionString += 'and student.masterId = :expert '
        conditionParameters['expert'] = filter.expert
    }

    if (filter.orientator) {
        conditionString += 'and student.orientatorId = :orientator '
        conditionParameters['orientator'] = filter.orientator
    }

    conditionString += "and student.orientatorId = :id OR student.masterId = :id"
    conditionParameters['id'] = expertId


    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };
}

export async function createApplication(application: CreateApplicationDto) {
    return await applicationRepository.save(application);
}

export async function editApplication(id: string, application: CreateApplicationDto) {
    application.id = id
    return await applicationRepository.save(application);
}
// TODO application isArchived need to be false to change
export async function editApplicationAfterWorkSheetChange(universityId: string, worksheet: WorksheetEntity) {
    const applications = await applicationRepository.find({ where: { universityId: universityId } })
    applications.forEach(application => {
        application
    })
    // await applicationRepository.save(application)
    return ;
}

export async function editApplicationActions(id: string, universityDto: ApplicationActionsDto) {
    return await applicationRepository.update(id, {
        applicationStatus: universityDto.applicationStatus,
        actionsStatus: universityDto.actionsStatus
    });
}

export async function deleteApplication(id: string) {
    const deleted = await applicationRepository.update(id, {
        deactivatedAt: new Date(),
    });
    return !!deleted;
}
