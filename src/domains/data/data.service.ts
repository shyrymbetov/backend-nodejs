import {dataSource} from '../../database';
import {RegionEntity} from "./model/region.entity";
import {LocalAreaEntity} from "./model/local-area.entity";
import {SchoolEntity} from "./model/school.entity";

const regionRepository = dataSource.getRepository(RegionEntity);
const localRepository = dataSource.getRepository(LocalAreaEntity);
const schoolRepository = dataSource.getRepository(SchoolEntity);

export async function getRegions(): Promise<RegionEntity[]> {
  return await regionRepository.find();
}

export async function getLocals(regionId: string): Promise<LocalAreaEntity[]> {
  return await localRepository.find({where: {regionId: regionId}});
}

export async function getSchools(localId: string): Promise<SchoolEntity[]> {
  return await schoolRepository.find({where: {localId: localId}});
}

export async function getRegionById(id: string): Promise<RegionEntity | null> {
  return await regionRepository.findOneBy({ id: id });
}

export async function getLocalById(id: string): Promise<LocalAreaEntity | null> {
  return await localRepository.findOneBy({ id: id });
}


export async function getSchoolById(id: string): Promise<SchoolEntity | null> {
  return await schoolRepository.findOneBy({ id: id });
}






