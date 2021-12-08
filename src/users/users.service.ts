import { findOne } from './dto/user.params';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.findByEmail(dto.email);
    if (user)
      throw new BadRequestException(
        `User with email: ${dto.email} already exists`,
      );

    dto.password = bcrypt.hashSync(
      dto.password,
      parseInt(process.env.SALT_ROUNDS),
    );
    try {
      const newUser = await this.userRepo.create(dto);
      const role = await this.rolesService.findByValue('USER');
      await newUser.$set('roles', [role]);
      newUser.roles = [role];
      return newUser;
    } catch (ex) {
      throw new BadRequestException(`There are some errors on user create`);
    }
  }

  async findAll() {
    const users = await this.userRepo.findAll({ include: [Role] });
    if (users.length === 0) {
      throw new BadRequestException(`There are no users in the table`);
    }
    return users;
  }

  async findOne(params: findOne) {
    const user = await this.userRepo.findOne({
      where: {
        id: params.user_id,
      },
      include: [Role],
    });

    if (!user) {
      throw new BadRequestException(`User with id:${params.user_id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      include: [Role],
    });
    return user;
  }

  async update(params: findOne, dto: UpdateUserDto) {
    await this.findOne(params);
    try {
      const result = await this.userRepo.update(dto, {
        where: { id: params.user_id },
        returning: true,
      });
      return result[1][0];
    } catch (ex) {
      throw new BadRequestException(
        `Failed to update user with id:${params.user_id}, perhaps the email is already taken`,
      );
    }
  }

  async remove(params: findOne) {
    const status = await this.userRepo.destroy({
      where: { id: params.user_id },
    });
    if (!status) {
      throw new BadRequestException(
        `Failed to delete user with id:${params.user_id}`,
      );
    }
  }
}
