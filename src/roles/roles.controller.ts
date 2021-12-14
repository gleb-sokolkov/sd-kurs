import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { findOne } from './dto/role.params';
import { RolesPipe } from 'src/pipes/roles.pipe';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':value')
  findOne(@Param(RolesPipe) params: findOne) {
    return this.rolesService.findOne(params);
  }

  @Patch(':value')
  update(@Param(RolesPipe) params: findOne, @Body() dto: UpdateRoleDto) {
    return this.rolesService.update(params, dto);
  }

  @Delete(':value')
  remove(@Param(RolesPipe) params: findOne) {
    return this.rolesService.remove(params);
  }
}
