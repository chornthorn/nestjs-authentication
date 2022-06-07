import { IsEmail, IsString } from 'class-validator';

export class LoginWithEmailDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class LoginWithUsernameDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
