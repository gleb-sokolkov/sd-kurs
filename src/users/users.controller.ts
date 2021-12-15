import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { findOne } from './dto/user.params';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { AuthorGuard } from 'src/roles/guards/author.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles('USER', 'ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @Roles('USER', 'ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() params: findOne) {
    return this.usersService.findOne(params);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthorGuard)
  @Patch(':user_id')
  @HttpCode(HttpStatus.OK)
  update(@Param() params: findOne, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params, updateUserDto);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthorGuard)
  @Delete(':user_id')
  @HttpCode(HttpStatus.OK)
  remove(@Param() params: findOne) {
    return this.usersService.remove(params);
  }
}
