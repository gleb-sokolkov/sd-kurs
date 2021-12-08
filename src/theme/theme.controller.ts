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
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { findOne } from './dto/theme.params';

@Controller()
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createThemeDto: CreateThemeDto) {
    return this.themeService.create(createThemeDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.themeService.findAll();
  }

  @Get(':theme_id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() params: findOne) {
    return this.themeService.findOne(params);
  }

  @Patch(':theme_id')
  @HttpCode(HttpStatus.OK)
  update(@Param() params: findOne, @Body() updateThemeDto: UpdateThemeDto) {
    return this.themeService.update(params, updateThemeDto);
  }

  @Delete(':theme_id')
  @HttpCode(HttpStatus.OK)
  remove(@Param() params: findOne) {
    return this.themeService.remove(params);
  }
}
