import { SetMetadata } from '@nestjs/common';
import { Constants } from '@app/common/constants/constants';

export const Public = () => SetMetadata(Constants.PUBLIC, true);
