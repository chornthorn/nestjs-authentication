import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { OAuthPayload } from '@app/common/interfaces/google-payload.interface';
import { Constants } from '@app/common/constants/constants';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(
  Strategy,
  Constants.FACEBOOK,
) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
      callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL'),
      profileFields: [
        'id',
        'displayName',
        'name',
        'gender',
        'picture.type(large)',
        'email',
      ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ): Promise<any> {
    const { name, photos, id } = profile;
    const user: OAuthPayload = {
      id: id,
      firstName: name.givenName,
      lastName: name.familyName,
      email: null,
      profileImage: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
