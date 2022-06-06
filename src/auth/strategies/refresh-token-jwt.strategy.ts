import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtRefreshPayload } from '@app/common/types/jwt-refresh-payload.type';
import { Constants } from '@app/common/constants/constants';

@Injectable()
export class RefreshTokenJwtStrategy extends PassportStrategy(
  Strategy,
  Constants.JWT_REFRESH,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'refresh-token-secret',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any): JwtRefreshPayload {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!refreshToken)
      throw new UnauthorizedException('Refresh token malformed.');

    return {
      ...payload,
      refreshToken,
    };
  }
}
