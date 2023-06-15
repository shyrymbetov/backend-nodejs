import { UserRoleEnum } from '../domains/user/types/user-role.enum';
import { hasRoleMiddleware } from './has-role.middleware';

export const isAdminMiddleware = hasRoleMiddleware(UserRoleEnum.Admin);
