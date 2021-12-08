import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Theme } from 'src/theme/entities/theme.entity';
import { ThemeService } from 'src/theme/theme.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { findOne } from './dto/question.params';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question) private questionRepo: typeof Question,
    private themeService: ThemeService,
  ) {}

  async create(params: findOne, dto: CreateQuestionDto) {
    const themes = await this.themeService.findByIDArray(dto.themes);
    const question = await this.questionRepo.create({
      ...dto,
      user_id: params.user_id,
    });
    await question.$set('themes', themes);
    question.themes = themes;
    return question;
  }

  async findAll(params: findOne) {
    const questions = await this.questionRepo.findAll({
      where: { user_id: params.user_id },
      include: [Theme],
    });
    if (questions.length === 0)
      throw new BadRequestException(`There are no questions in the table`);
    return questions;
  }

  async findOne(params: findOne) {
    const question = await this.questionRepo.findOne({
      where: {
        id: params.question_id,
        user_id: params.user_id,
      },
      include: [Theme],
    });
    if (!question)
      throw new BadRequestException(`There is no such question in the table`);
    return question;
  }

  async update(params: findOne, dto: UpdateQuestionDto) {
    await this.findOne(params);
    try {
      const result = await this.questionRepo.update(
        {
          name: dto.name,
          text: dto.text,
          user_id: params.user_id,
        },
        {
          where: {
            id: params.question_id,
            user_id: params.user_id,
          },
          returning: true,
        },
      );
      const question = result[1][0];
      if (dto.themes) {
        const themes = await this.themeService.findByIDArray(dto.themes);
        question.$set('themes', themes);
      }
      return question;
    } catch (ex) {
      throw new BadRequestException(
        `Failed to update question with params:${params}`,
      );
    }
  }

  async remove(params: findOne) {
    const status = await this.questionRepo.destroy({
      where: {
        id: params.question_id,
        user_id: params.user_id,
      },
    });
    if (!status)
      throw new BadRequestException(
        `Failed to destroy question with params:${params}`,
      );
  }
}
