
export type RegisterUserType = {
  avatar?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthDate: string;
  phone: string;

  regionId: string;
  localId: string;
  school?: string | null;
  class?: number | null;

  masterId?: string | null;
  orientatorId?: string | null;
  type: string;
};
