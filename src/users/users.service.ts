import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '@app/users/dto/update-user.dto';
import { CreateUserDto } from '@app/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '@app/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PaginateDto,
  PaginateMetaDto,
  PaginateOptionsDto,
} from '@app/common/paginations/PaginateDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const randomNumber = this.getRandomInt(100, 1000);
    createUserDto.username = (
      createUserDto.firstName +
      createUserDto.lastName +
      randomNumber
    ).toLowerCase();
    const _entity = this.usersRepository.create({ ...createUserDto });
    return await this.usersRepository.save(_entity);
  }

  async findAll(
    pageOptionsDto: PaginateOptionsDto,
  ): Promise<PaginateDto<User>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder
      .orderBy('user.create_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const paginateMetaDto = new PaginateMetaDto({ pageOptionsDto, itemCount });
    return new PaginateDto<User>(entities, paginateMetaDto);
  }

  async findOneByID(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ username });
  }

  async findOneByOAuthID(oauthId: string): Promise<User> {
    return await this.usersRepository.findOne({ oauthId });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateResult = await this.usersRepository.update(
      { id },
      { ...updateUserDto },
    );
    if (!updateResult) {
      throw new BadRequestException("Can't Update user");
    }
    return {
      data: 'Update user successfully',
    };
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.usersRepository.update(
      { id: userId },
      { refreshToken },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return true;
  }

  async userProfile(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) throw new NotFoundException('User not found.');
    delete user.password;
    return user;
  }

  async remove(id: number) {
    const user = await this.findOneByID(id);
    const result = await this.usersRepository.remove(user);
    if (!result) {
      throw new BadRequestException('User delete not successfully');
    }
    return {
      data: 'User delete successfully',
    };
  }

  /**
   * Gets random int
   * @param min
   * @param max
   * @returns random int - min & max inclusive
   */
  private getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
