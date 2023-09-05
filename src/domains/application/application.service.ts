import {dataSource} from '../../database';
import {ApplicationEntity} from "./model/application.entity";
import {GetApplicationsParamsDto} from "./dto/get-applications-params.dto";
import {CreateApplicationDto} from "./dto/create-application.dto";
import {ApplicationActionsDto} from "./dto/application-actions.dto";

const applicationRepository = dataSource.getRepository(ApplicationEntity);

export async function getApplication(id: string): Promise<ApplicationEntity | null> {
    return await applicationRepository
        .createQueryBuilder('application')
        .leftJoinAndSelect('application.university', 'university')
        .where('university.id = :id', {id})
        .getOne();
}
export async function getApplications(filter: GetApplicationsParamsDto): Promise<any> {

    const { conditionString, conditionParameters } = generateConditionsForGetUser(filter)

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

function generateConditionsForGetUser(filter: GetApplicationsParamsDto) {
    let conditionString = 'true '
    let conditionParameters = {}

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

export async function editApplicationActions(id: string, universityDto: ApplicationActionsDto) {
    return await applicationRepository.update(id, {
    });
}

export async function deleteApplication(id: string) {
    const deleted = await applicationRepository.update(id, {
        deactivatedAt: new Date(),
    });
    return !!deleted;
}
