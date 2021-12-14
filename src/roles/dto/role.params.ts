import { IsOptional, IsString } from 'class-validator';

export class findOne {
  @IsOptional()
  @IsString()
  value: string;
}
