import { Role } from '@app/common/types/role.type';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  oauthId: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  provider: string;

  @IsOptional()
  @IsString()
  role: Role;
}
