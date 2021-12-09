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
import { AnswerService } from './answer.service';
import { findOne } from './dto/answer.params';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Param() params: findOne, @Body() dto: CreateAnswerDto) {
    return this.answerService.create(params, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Param() params: findOne) {
    return this.answerService.findAll(params);
  }

  @Get(':answer_id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() params: findOne) {
    return this.answerService.findOne(params);
  }

  @Patch(':answer_id')
  @HttpCode(HttpStatus.OK)
  update(@Param() params: findOne, @Body() dto: UpdateAnswerDto) {
    return this.answerService.update(params, dto);
  }

  @Delete(':answer_id')
  @HttpCode(HttpStatus.OK)
  remove(@Param() params: findOne) {
    return this.answerService.remove(params);
  }
}
