import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user)
      throw new BadRequestException(
        `Such user with email:${dto.email} does not exists`,
      );
    const match = bcrypt.compareSync(dto.password, user.password);
    if (!match) throw new BadRequestException(`Wrong password`);
    const token = this.generateToken(user);
    return this.tokenToCookie(token);
  }

  async registration(dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    const token = this.generateToken(user);
    return this.tokenToCookie(token);
  }

  private generateToken(user: User) {
    const payload = {
      id: user.user_id,
      roles: user.roles,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.AT_EXPIRE,
    });
    return token;
  }

  private tokenToCookie(token: string) {
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.AT_EXPIRE}`;
  }
}
