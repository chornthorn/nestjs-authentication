import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAccessPayload } from '@app/common/types/jwt-access-payload.type';
import { Constants } from '@app/common/constants/constants';

@Injectable()
export class AccessTokenJwtStrategy extends PassportStrategy(
  Strategy,
  Constants.JWT,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'access-token-secret',
    });
  }

  validate(payload: JwtAccessPayload) {
    return payload;
  }
}
