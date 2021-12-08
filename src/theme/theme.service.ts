import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateThemeDto } from './dto/create-theme.dto';
import { findOne } from './dto/theme.params';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { Theme } from './entities/theme.entity';

@Injectable()
export class ThemeService {
  constructor(@InjectModel(Theme) private themeRepo: typeof Theme) {}

  async create(dto: CreateThemeDto) {
    try {
      const result = await this.themeRepo.create(dto);
      return result;
    } catch (ex) {
      throw new BadRequestException(
        `Failed to create new theme with dto: ${dto}`,
      );
    }
  }

  async findAll() {
    const themes = await this.themeRepo.findAll();
    if (themes.length === 0)
      throw new BadRequestException(`There are no themes in the table`);
    return themes;
  }

  async findOne(params: findOne) {
    const theme = await this.themeRepo.findOne({
      where: { id: params.theme_id },
    });
    if (!theme)
      throw new BadRequestException(`There is no such theme in the table`);
    return theme;
  }

  async findByIDArray(id: number[]) {
    const themes = await this.themeRepo.findAll({
      where: {
        id: {
          [Op.in]: id,
        },
      },
    });
    if (themes.length === 0)
      throw new BadRequestException(`There are no themes with:${id}`);
    return themes;
  }

  async update(params: findOne, dto: UpdateThemeDto) {
    await this.findOne(params);
    try {
      const result = await this.themeRepo.update(dto, {
        where: { id: params.theme_id },
        returning: true,
      });
      return result[1][0];
    } catch (ex) {
      throw new BadRequestException(
        `Failed to update the theme with params: ${params}`,
      );
    }
  }

  async remove(params: findOne) {
    const status = await this.themeRepo.destroy({
      where: { id: params.theme_id },
    });
    if (!status)
      throw new BadRequestException(
        `Failed to destroy the theme with params: ${params}`,
      );
  }
}
