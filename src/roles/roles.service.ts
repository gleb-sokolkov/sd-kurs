import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { findOne } from './dto/role.params';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

  async create(dto: CreateRoleDto) {
    const role = await this.roleRepo.findOne({ where: { value: dto.value } });
    if (role) {
      throw new BadRequestException(`Role ${dto.value} already exists`);
    }
    const newRole = await this.roleRepo.create(dto);
    return newRole;
  }

  async findAll() {
    const roles = await this.roleRepo.findAll();
    if (roles.length === 0) {
      throw new BadRequestException(`There aren't any roles in the table`);
    }
    return roles;
  }

  async findOne(params: findOne) {
    const role = await this.roleRepo.findOne({ where: params });
    if (!role) {
      throw new BadRequestException({
        message: `There isn't the role in the table`,
        params,
      });
    }
    return role;
  }

  async update(params: findOne, dto: UpdateRoleDto) {
    await this.findOne(params);
    try {
      const result = await this.roleRepo.update(dto, {
        where: params,
        returning: true,
      });
      return result[1][0];
    } catch (ex) {
      throw new BadRequestException({
        message: `Failed to update a role`,
        params,
        dto,
      });
    }
  }

  async remove(params: findOne) {
    const status = await this.roleRepo.destroy({ where: params });
    if (!status) {
      throw new BadRequestException({
        message: `Failed to remove a role`,
        params,
      });
    }
  }
}
