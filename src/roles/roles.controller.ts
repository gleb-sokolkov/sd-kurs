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
import { RoleDto } from './dto/role.dto';
import { findOne } from './dto/role.params';
import { RolesPipe } from 'src/roles.pipe';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() dto: RoleDto) {
    return this.rolesService.create(dto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':role_value')
  findOne(@Param(RolesPipe) params: findOne) {
    return this.rolesService.findOne(params);
  }

  @Patch(':role_value')
  update(@Param(RolesPipe) params: findOne, @Body() dto: RoleDto) {
    return this.rolesService.update(params, dto);
  }

  @Delete(':role_value')
  remove(@Param(RolesPipe) params: findOne) {
    return this.rolesService.remove(params);
  }
}
