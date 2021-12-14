import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  text: string;

  @IsArray()
  @IsNumber({}, { each: true })
  themes: number[];
}
