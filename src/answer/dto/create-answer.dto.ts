import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
