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
    try {
      const answer = await this.answerRepo.create({
        ...dto,
        question_id: params.question_id,
      });
      return answer;
    } catch (ex) {
      throw new BadRequestException({
        message: `Failed to create a new answer`,
        params,
        dto,
      });
    }
  }

  async findAll(params: findOne) {
    const { user_id, answer_id, ...findAll } = params;
    const answers = await this.answerRepo.findAll({ where: findAll });
    if (answers.length === 0)
      throw new BadRequestException({
        message: `Not found any answers to this question`,
        params,
      });
    return answers;
  }

  async findOne(params: findOne) {
    const { user_id, ...findOne } = params;
    const answer = await this.answerRepo.findOne({ where: findOne });
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
      const { user_id, ...updateOne } = params;
      const result = await this.answerRepo.update(dto, {
        where: updateOne,
        returning: true,
      });
      return result[1][0];
    } catch (ex) {
      throw new BadRequestException({
        message: `Failed to update an answer`,
        params,
        dto,
      });
    }
  }

  async remove(params: findOne) {
    const { user_id, ...removeOne } = params;
    const status = await this.answerRepo.destroy({ where: removeOne });
    if (!status)
      throw new BadRequestException({
        message: `Failed to delete an answer`,
        params,
      });
  }
}
