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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { findOne } from './dto/user.params';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() params: findOne) {
    return this.usersService.findOne(params);
  }

  @Patch(':user_id')
  @HttpCode(HttpStatus.OK)
  update(@Param() params: findOne, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params, updateUserDto);
  }

  @Delete(':user_id')
  @HttpCode(HttpStatus.OK)
  remove(@Param() params: findOne) {
    return this.usersService.remove(params);
  }
}
