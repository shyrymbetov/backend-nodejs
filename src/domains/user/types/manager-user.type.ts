import {UserRoleEnum} from "./user-role.enum";

//User without password
export type ManagerUserType = {
  id: string;
  avatar?: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  regionId: string;
  localId: string;
  studentCount: number;
  schoolboyCount: number;
  role: UserRoleEnum;
};
