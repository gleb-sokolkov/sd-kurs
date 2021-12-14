import { PartialType } from '@nestjs/mapped-types';
import { IsNumberString, IsOptional } from 'class-validator';
import { findOne as _findOne } from 'src/users/dto/user.params';

export class findOne extends PartialType(_findOne) {
  @IsOptional()
  @IsNumberString()
  question_id: number;
}
