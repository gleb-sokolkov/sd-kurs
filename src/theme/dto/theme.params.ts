import { IsNumberString, IsOptional } from 'class-validator';

export class findOne {
  @IsOptional()
  @IsNumberString()
  theme_id: number;
}
