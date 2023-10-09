import {dataSource} from '../../database';
import {ApplicationEntity} from "./model/application.entity";
import {GetApplicationsParamsDto} from "./dto/get-applications-params.dto";
import {CreateApplicationDto} from "./dto/create-application.dto";
import {ApplicationActionsDto} from "./dto/application-actions.dto";
import {getStudentsByMasterOrOrientatorIdWithApplications} from "../students/student.service"
import {createApplicationChat} from "../chat/chat.service";
import {CreateWorksheetDto} from "../worksheet/dtos/create-worksheet.dto";
import {GetMyApplicationsParamsDto} from "./dto/get-my-applications-params.dto";
import {UniversityImportantDatesEntity} from "../university/model/university-important-dates.entity";
import {In} from "typeorm";
import {SchoolEntity} from "../data/model/school.entity";
import {sendMailMessage} from "../mail/mail.service";
import {UserType} from "../notifications/type/user.type";
import {getUserById} from "../user/user.service";
import {UserRoleEnum} from "../user/types/user-role.enum";
import {sendNotificationCount} from "../../sockets/websocket.service";


const applicationRepository = dataSource.getRepository(ApplicationEntity);
const universityImportantDatesEntity = dataSource.getRepository(UniversityImportantDatesEntity)
const schoolRepository = dataSource.getRepository(SchoolEntity)

const fieldKeys = ['profileFields', 'contactsFields', 'educationFields', 'languagesFields', 'recommendationsFields', 'motivationFields', 'documentsFields', 'otherFields',];

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

export async function getApplications(userId: string, filter: any): Promise<any> {

    const {conditionString, conditionParameters} = generateConditionsForGetApplication(userId, filter)

    return await applicationRepository.createQueryBuilder('application')
        .leftJoinAndSelect('application.university', 'university')
        .select([
            'application.id as id',
            'university.universityName as "universityName"',
        ])
        .where(conditionString, conditionParameters)
        .orderBy('application.created_at', 'DESC')
        .getRawMany();
}

export async function getStudentApplicationById(filter: GetMyApplicationsParamsDto, studentId: string): Promise<any> {

    let {conditionString, conditionParameters} = generateConditionsForGetStudentApplication(filter, studentId)

    return await applicationRepository.createQueryBuilder('application')
        .leftJoinAndSelect('application.student', 'student')
        .leftJoinAndSelect('student.applications', 'applications')
        .where(conditionString, conditionParameters)
        .getMany()
}

function generateConditionsForGetStudentApplication(filter: GetMyApplicationsParamsDto, studentId: string) {

    let conditionString = 'true '
    let conditionParameters = {}
    if (filter.applicationStatus) {
        conditionString += 'and application.applicationStatus = :applicationStatus '
        conditionParameters['applicationStatus'] = filter.applicationStatus
    }

    conditionString += "and application.student_id = :studentId "
    conditionParameters['studentId'] = studentId


    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };
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

function generateConditionsForGetApplication(userId: string, filter: GetApplicationsParamsDto) {

    let conditionString = "application.studentId = :userId AND application.applicationStatus != 'DRAFT'"
    let conditionParameters = {userId}

    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };
}


function generateConditionsForGetApplicationForDraft(filter: GetApplicationsParamsDto, expertId: string) {

    let conditionString = 'true '
    let conditionParameters = {}

    conditionString += "and (student.orientatorId = :id OR student.masterId = :id) ";
    conditionParameters['id'] = expertId;

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

    if (filter.expertString) {
        conditionString += 'and student.firstName = :expertString '
        conditionParameters['expertString'] = filter.expertString
    }

    if (filter.orientatorString) {
        conditionString += 'and student.firstName = :orientatorString '
        conditionParameters['orientatorString'] = filter.orientatorString
    }

    conditionString += "and application.applicationStatus = 'DRAFT' "

    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };
}

async function sendEmailMessage(application: ApplicationEntity, html: string) {
    const user = await getUserById(application.studentId!)
    const master = await getUserById(user?.masterId!)
    const orientator = await getUserById(user?.orientatorId!)
    const emails = [user?.email, master?.email, orientator?.email]

    for (let email of emails) {
        //TODO html
        await sendMailMessage({
            to: email ?? '',
            subject: 'Notification ',
            html: html
        })
    }
}


export async function createApplication(application: CreateApplicationDto) {
    const applicationSaved = await applicationRepository.save(application);
    const currentApplication = await getApplicationById(applicationSaved['id'])

    if (applicationSaved['applicationStatus'] == 'APPLICATION_RECEIVED') {
        sendEmailMessage(currentApplication!, "Application Recived to Server").then()
    }

    await createApplicationChat(applicationSaved)
    return applicationSaved
}

export async function editApplication(id: string, application: CreateApplicationDto) {
    application.id = id
    const applicationSaved = await applicationRepository.save(application);

    const currentApplication = await getApplicationById(id)
    sendEmailMessage(currentApplication!, "Application Changed").then()

    return applicationSaved
}


export async function editApplicationAfterWorkSheetChange(universityId: string, worksheet: CreateWorksheetDto) {
    // Check if the application's isArchived property is false
    const applications = await applicationRepository.find({where: {universityId: universityId, isArchived: false}});

    for (const application of applications) {
        for (const fieldsKey of fieldKeys) {
            const applicationFields = application[fieldsKey]
                .reduce((acc, obj) => {
                    acc.set(obj.worksheetFieldId, obj);
                    return acc;
                }, new Map());
            const newApplicationFields: any[] = []
            worksheet[fieldsKey].forEach(field => {
                const newField = JSON.parse(JSON.stringify(field))
                delete newField['id']
                newField['worksheetFieldId'] = field.id
                if(applicationFields[field.id]) {
                    newField['fieldValue'] = applicationFields[field.id].fieldValue
                }
                newApplicationFields.push(newField)
            })
            application[fieldsKey] = newApplicationFields
        }
        await applicationRepository.save(application);
    }

    // Return if needed
}

export async function editApplicationActions(id: string, universityDto: ApplicationActionsDto) {
    const currentApplication = await getApplicationById(id)
    sendEmailMessage(currentApplication!, "Application and Action Status Changed").then()

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


function getExactlyMy(managerId: string) {
    let conditionString = 'true '
    let conditionParameters = {}

    conditionString += "and (student.orientatorId = :id OR student.masterId = :id) ";
    conditionParameters['id'] = managerId;


    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };
}

export async function getAvailableCountries(managerId: string) {

    let {conditionString, conditionParameters} = getExactlyMy(managerId)


    return await applicationRepository
        .createQueryBuilder('application')
        .innerJoin('application.university', 'university')
        .innerJoin('university.country', 'country')
        .innerJoin('application.student', 'student')
        .select('DISTINCT country.id, country.name')
        .where(conditionString, conditionParameters)
        .getRawMany();
}

export async function getAvailableUniversities(managerId: string) {

    let {conditionString, conditionParameters} = getExactlyMy(managerId)

    return await applicationRepository
        .createQueryBuilder('application')
        .innerJoin('application.university', 'university')
        .innerJoin('application.student', 'student')
        .select('DISTINCT university.id, university.universityName as "universityName"')
        .where(conditionString, conditionParameters)
        .getRawMany();
}

export async function getAvailableSemesters(managerId: string) {

    let {conditionString, conditionParameters} = getExactlyMy(managerId)

    return (await universityImportantDatesEntity.find({
        where: {
            id: In((await applicationRepository
                .createQueryBuilder('application')
                .innerJoin('application.university', 'university')
                .innerJoin('application.student', 'student')
                .select("DISTINCT  application.specialityType ->> 'importantDayId' as id")
                .where(conditionString, conditionParameters)
                .getRawMany()).map(item => item.id))
        }
    })).map(record => ({
        id: record.id,
        name: record.name
    }));
}


export async function getAvailableSchools(managerId: string) {

    let {conditionString, conditionParameters} = getExactlyMy(managerId)


    return (await schoolRepository.find({
        where: {
            id: In((await applicationRepository
                .createQueryBuilder('application')
                .innerJoinAndSelect('application.student', 'student')
                .where(conditionString + ' and student.school IS NOT NULL ', conditionParameters)
                .select('DISTINCT student.school')
                .getRawMany()).map(item => item.school))
        }
    })).map(record => ({
        id: record.id,
        nameKZ: record.nameKZ,
        nameRU: record.nameRU
    }));

}

export async function getAvailableOrientators(managerId: string) {

    let {conditionString, conditionParameters} = getExactlyMy(managerId)

    return await applicationRepository
        .createQueryBuilder('application')
        .innerJoinAndSelect('application.student', 'student')
        .innerJoinAndSelect('student.orientator', 'orientator')
        .where(conditionString + ' and student.orientatorId IS NOT NULL', conditionParameters)
        .select('DISTINCT orientator.id as id, orientator.firstName as "firstName", orientator.lastName as "lastName"')
        .getRawMany();
}

export async function getAvailableExperts(managerId: string) {

    let {conditionString, conditionParameters} = getExactlyMy(managerId)

    return await applicationRepository
        .createQueryBuilder('application')
        .innerJoinAndSelect('application.student', 'student')
        .innerJoinAndSelect('student.master', 'master')
        .where(conditionString + ' and student.masterId IS NOT NULL ', conditionParameters)
        .select('DISTINCT master.id as id, master.firstName as "firstName", master.lastName as "lastName"')
        .getRawMany();
}

