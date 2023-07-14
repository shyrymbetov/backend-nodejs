import {dataSource} from '../../database';
import {RegionEntity} from "./region.entity";
import {UserEntity} from "../user/user.entity";
import {LocalAreaEntity} from "./local-area.entity";
import {SchoolEntity} from "./school.entity";

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



