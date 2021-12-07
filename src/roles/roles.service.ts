import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleDto } from './dto/role.dto';
import { findOne } from './dto/role.params';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

  async create(dto: RoleDto) {
    const role = await this.findByValue(dto.value);
    if (role) {
      throw new BadRequestException(`Role ${dto.value} already exists`);
    }
    const newRole = await this.roleRepo.create(dto);
    return newRole;
  }

  async findAll() {
    const roles = await this.roleRepo.findAll();
    if (!roles) {
      throw new BadRequestException(`There aren't any roles in the table`);
    }
    return roles;
  }

  async findOne(params: findOne) {
    const role = await this.roleRepo.findOne({
      where: { value: params.role_value },
    });
    if (!role) {
      throw new BadRequestException(
        `There isn't a role ${params.role_value} in the table`,
      );
    }
    return role;
  }

  async findByValue(value: string) {
    return this.roleRepo.findOne({ where: { value } });
  }

  async update(params: findOne, dto: RoleDto) {
    await this.findOne(params);
    try {
      const result = await this.roleRepo.update(dto, {
        where: { value: params.role_value },
        returning: true,
      });
      return result[1][0];
    } catch (ex) {
      console.log(ex);
      throw new BadRequestException(
        `Failed to update role ${params.role_value}`,
      );
    }
  }

  async remove(params: findOne) {
    const status = await this.roleRepo.destroy({
      where: { value: params.role_value },
    });
    if (!status) {
      throw new BadRequestException(
        `Failed to remove role ${params.role_value}. There is no such role in the table`,
      );
    }
  }
}
