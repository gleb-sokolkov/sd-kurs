import { ThemeModule } from './../theme/theme.module';
import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './entities/question.entity';

@Module({
  imports: [SequelizeModule.forFeature([Question]), ThemeModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
