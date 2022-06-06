import { SetMetadata } from '@nestjs/common';
import { Constants } from '@app/common/constants/constants';

export const Roles = (...roles: string[]) =>
  SetMetadata(Constants.ROLES, roles);
