import { IsEmail, IsInt, IsString } from 'class-validator';
import { Role } from '@app/common/types/role.type';

export class CreateTokenDto {
  constructor(id: number, username: string, email: string, roles: Role) {
    this.userId = id;
    this.email = email;
    this.roles = roles;
    this.username = username;
  }

  @IsInt()
  readonly userId: number;

  @IsEmail()
  readonly email: string;

  roles: Role;

  @IsString()
  username: string;
}
