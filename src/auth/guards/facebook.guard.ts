import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from '@app/common/constants/constants';

@Injectable()
export class FacebookGuard extends AuthGuard(Constants.FACEBOOK) {
  constructor() {
    super({
      scope: ['public_profile'],
    });
  }
}
