import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  @IsString()
  description: string;
}
