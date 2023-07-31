import {UserRoleEnum} from "./user-role.enum";

//User without password
export type StudentUserType = {
  id: string;
  avatar?: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  regionId: string;
  localId: string;
  school?: string | null;
  class?: number | null;
  masterId?: string | null;
  orientatorId?: string | null;
  role: UserRoleEnum;
};
