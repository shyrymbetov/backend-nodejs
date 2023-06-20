import { UserRoleEnum } from './user-role.enum';

export type CreateUserType = {
  email: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
  role: UserRoleEnum;
};
