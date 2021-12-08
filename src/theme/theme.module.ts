import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Theme } from './entities/theme.entity';

@Module({
  imports: [SequelizeModule.forFeature([Theme])],
  controllers: [ThemeController],
  providers: [ThemeService],
  exports: [ThemeService],
})
export class ThemeModule {}
