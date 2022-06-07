import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { OAuthPayload } from '@app/common/interfaces/google-payload.interface';
import { Constants } from '@app/common/constants/constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  Constants.GOOGLE,
) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, id } = profile;
    const user: OAuthPayload = {
      firstName: name.givenName,
      lastName: name.familyName,
      email: emails[0].value,
      profileImage: photos[0].value,
      id,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
