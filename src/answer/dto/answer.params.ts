import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import { findOne as _findOne } from 'src/question/dto/question.params';

export class findOne extends PartialType(_findOne) {
  @IsOptional()
  @IsNumberString()
  answer_id: number;
}
