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
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { findOne } from './dto/question.params';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Param() params: findOne, @Body() dto: CreateQuestionDto) {
    return this.questionService.create(params, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Param() params: findOne) {
    return this.questionService.findAll(params);
  }

  @Get(':question_id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() params: findOne) {
    return this.questionService.findOne(params);
  }

  @Patch(':question_id')
  @HttpCode(HttpStatus.OK)
  update(@Param() params: findOne, @Body() dto: UpdateQuestionDto) {
    return this.questionService.update(params, dto);
  }

  @Delete(':question_id')
  @HttpCode(HttpStatus.OK)
  remove(@Param() params: findOne) {
    return this.questionService.remove(params);
  }
}
