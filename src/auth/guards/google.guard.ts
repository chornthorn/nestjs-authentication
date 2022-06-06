import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from '@app/common/constants/constants';

@Injectable()
export class GoogleGuard extends AuthGuard(Constants.GOOGLE) {
  constructor() {
    super();
  }
}
