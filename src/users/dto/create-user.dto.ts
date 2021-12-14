import { IsEmail, IsString } from 'class-validator';
import { IsStrongPassword } from 'src/validation-decorators/IsStrongPassword';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
