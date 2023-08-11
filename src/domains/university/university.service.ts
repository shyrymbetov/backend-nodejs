import {dataSource} from '../../database';
import {UniversityEntity } from './model/university.entity';
import {CreateUniversityDto} from "./dtos/create-university.dto";
import {GetUniversitiesFilterDto} from "./dtos/get-univerties-params.dto";
import {UniversityActionsDto} from "./dtos/university-actions.dto";

const universityRepository = dataSource.getRepository(UniversityEntity);

export async function getUniversities(filter: any): Promise<any> {

  const { conditionString, conditionParameters } = generateConditionsForGetUniversities(filter)

  const data = await universityRepository.createQueryBuilder('university')
      .leftJoinAndSelect('university.tuitionCost', 'tuition')
      .leftJoinAndSelect('university.worksheet', 'worksheet')
      .select([
        'university.id as id',
        'university.logo as logo',
        'university.universityName as universityName',
        'tuition.tuitionCost as tuitionCost',
        'university.isVisible as isVisible',
        'university.canApply as canApply',
        'worksheet.id as worksheetId',
      ])
      .where(conditionString, conditionParameters)
      .skip((filter.page - 1) * filter.size)
      .take(filter.size)
      .getRawMany();

  const totalCount = await universityRepository
      .createQueryBuilder('university')
      .where(conditionString, conditionParameters)
      .getCount();

  return {
    data: data,
    totalCount: totalCount
  }
}

function generateConditionsForGetUniversities(filter: GetUniversitiesFilterDto) {
  let conditionString = 'true '
  let conditionParameters = {}
  if (filter.country) {
    conditionString += 'and university.country = :country '
    conditionParameters['country'] = filter.country
  }

  if (filter.search) {
    conditionString += 'and LOWER(university.universityName) like LOWER(:universityName) '
    conditionParameters['universityName'] = `%${filter.search}%`
  }

  return {
    conditionString: conditionString,
    conditionParameters: conditionParameters,
  };
}

export async function getUniversityById(id: string): Promise<UniversityEntity | null> {
  return await universityRepository.findOneBy({ id: id });
}

export async function createUniversity(universityDto: CreateUniversityDto) {
    console.log(universityDto)


  return await universityRepository.save(universityDto);
}

export async function editUniversity(id: string, universityDto: CreateUniversityDto) {
  return await universityRepository.update(id, universityDto);
}

export async function editUniversityActions(id: string, universityDto: UniversityActionsDto) {
  return await universityRepository.update(id, {
      isVisible: universityDto.isVisible,
      canApply: universityDto.canApply
  });
}

export async function deleteUniversity(id: string) {
  return await universityRepository.delete(id);
}

