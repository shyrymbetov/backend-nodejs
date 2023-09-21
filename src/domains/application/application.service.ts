import {dataSource} from '../../database';
import {ApplicationEntity} from "./model/application.entity";
import {GetApplicationsParamsDto} from "./dto/get-applications-params.dto";
import {CreateApplicationDto} from "./dto/create-application.dto";
import {ApplicationActionsDto} from "./dto/application-actions.dto";
import {getStudentsByMasterOrOrientatorIdWithApplications} from "../students/student.service"
import {createApplicationChat} from "../chat/chat.service";
import {CreateWorksheetDto} from "../worksheet/dtos/create-worksheet.dto";
import {GetMyApplicationsParamsDto} from "./dto/get-my-applications-params.dto";


const applicationRepository = dataSource.getRepository(ApplicationEntity);
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
    console.log(expertId)
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

    conditionString += "and application.applicationStatus = 'DRAFT' "




    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };
}

export async function createApplication(application: CreateApplicationDto) {
    const applicationSaved = await applicationRepository.save(application);
    await createApplicationChat(applicationSaved)
    return applicationSaved
}

export async function editApplication(id: string, application: CreateApplicationDto) {
    application.id = id
    return await applicationRepository.save(application);
}

// TODO application isArchived need to be false to change
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



export async function getAvailableCountries() {

    return await applicationRepository
        .createQueryBuilder('application')
        .innerJoin('application.university', 'university')
        .innerJoin('university.country', 'country')
        .select('DISTINCT country.id, country.name')
        .getRawMany();
}

export async function getAvailableUniversities() {

    return await applicationRepository
        .createQueryBuilder('application')
        .innerJoin('application.university', 'university')
        .select('DISTINCT university.id, university.universityName')
        .getRawMany();
}

export async function getAvailableSemesters() {

    return await applicationRepository
        .createQueryBuilder('application')
        .innerJoin('application.university', 'university')
        .select("DISTINCT  application.specialityType ->> 'importantDayId', application.specialityType ->> 'importantDayId'")
        .getRawMany();

}


export async function getAvailableSchools() {

    return await applicationRepository
        .createQueryBuilder('application')
        .innerJoinAndSelect('application.student', 'student')
        .where('student.school IS NOT NULL')
        .select('DISTINCT student.school')
        .getRawMany();
}

export async function getAvailableOrientators() {

    return await applicationRepository
        .createQueryBuilder('application')
        .innerJoinAndSelect('application.student', 'student')
        .innerJoinAndSelect('student.orientator', 'orientator')
        .where('student.orientatorId IS NOT NULL')
        .select('DISTINCT orientator.id, orientator.firstName, orientator.lastName')
        .getRawMany();
}

export async function getAvailableExperts() {

    return await applicationRepository
        .createQueryBuilder('application')
        .innerJoinAndSelect('application.student', 'student')
        .innerJoinAndSelect('student.master', 'master')
        .where('student.masterId IS NOT NULL')
        .select('DISTINCT master.id, master.firstName, master.lastName')
        .getRawMany();
}


