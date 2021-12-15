import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    try {
      const auth = req.headers.authorization;
      const [type, token] = auth.split(' ');

      if (type !== 'Bearer' || !token)
        throw new UnauthorizedException({
          message: `Wrong token scheme`,
        });

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      res.user = user;
      return true;
    } catch (ex) {
      throw new UnauthorizedException({
        message: `Uncorrect token`,
      });
    }
  }
}
