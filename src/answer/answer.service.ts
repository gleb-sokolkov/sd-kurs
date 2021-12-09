import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { findOne } from './dto/answer.params';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer) private answerRepo: typeof Answer) {}

  async create(params: findOne, dto: CreateAnswerDto) {
    const answer = await this.answerRepo.create(
      Object.assign(dto, {
        question_id: params.question_id,
        user_id: params.user_id,
      }),
    );
    return answer;
  }

  async findAll(params: findOne) {
    const answers = await this.answerRepo.findAll({
      where: { question_id: params.question_id },
    });
    if (answers.length === 0)
      throw new BadRequestException({
        message: `Not found any answers to this question`,
        params,
      });
    return answers;
  }

  async findOne(params: findOne) {
    const answer = await this.answerRepo.findOne({
      where: {
        id: params.answer_id,
      },
    });
    if (!answer)
      throw new BadRequestException({
        message: `Not found the answer to this question`,
        params,
      });
    return answer;
  }

  async update(params: findOne, dto: UpdateAnswerDto) {
    await this.findOne(params);
    try {
      const result = await this.answerRepo.update(dto, {
        where: { id: params.answer_id },
        returning: true,
      });
      return result[1][0];
    } catch (ex) {
      throw new BadRequestException({
        message: `Failed to update an answer`,
        params,
      });
    }
  }

  async remove(params: findOne) {
    const status = await this.answerRepo.destroy({
      where: { id: params.answer_id },
    });
    if (!status)
      throw new BadRequestException({
        message: `Failed to delete an answer`,
        params,
      });
    return status;
  }
}
