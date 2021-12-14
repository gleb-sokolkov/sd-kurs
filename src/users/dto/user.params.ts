import { IsNumberString, IsOptional } from 'class-validator';

export class findOne {
  @IsOptional()
  @IsNumberString()
  user_id: number;
}
