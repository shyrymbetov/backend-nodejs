import {UserRoleEnum} from "./user-role.enum";

export type CreateUserType = {
  avatar?: string;
  email: string;
  firstName: string;
  lastName: string;
  hashedPassword?: string;
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
