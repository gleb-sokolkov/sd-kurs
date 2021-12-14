import { IsNumberString, IsOptional } from 'class-validator';

export class findOne {
  @IsOptional()
  @IsNumberString()
  message_id: number;

  @IsOptional()
  @IsNumberString()
  receiver_id: number;
}
