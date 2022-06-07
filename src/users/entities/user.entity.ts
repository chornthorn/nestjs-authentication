import { Column, Entity } from 'typeorm';
import { Role } from '../../common/types/role.type';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity('tbl_users')
export class User extends AbstractEntity {
  @Column({
    unique: true,
    nullable: true,
  })
  oauthId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    nullable: true,
  })
  username: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ default: 'local' }) // local: email and password
  provider: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  refreshToken: string;
}
