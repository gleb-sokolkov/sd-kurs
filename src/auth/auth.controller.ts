import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: CreateUserDto, @Req() req: Request) {
    const token = await this.authService.login(dto);
    req.res.setHeader('Set-Cookie', token);
  }

  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() dto: CreateUserDto, @Req() req: Request) {
    console.log('allo');
    const token = await this.authService.registration(dto);
    req.res.setHeader('Set-Cookie', token);
  }
}
