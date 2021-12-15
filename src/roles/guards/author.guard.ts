import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();

      if (!res.user)
        throw new UnauthorizedException({
          message: 'You are not authorized',
        });

      if (roles.length !== 0)
        if (res.user.roles.some((role) => roles.includes(role.value)))
          return true;

      return res.user.user_id === parseInt(req.params.user_id);
    } catch (ex) {
      throw new ForbiddenException({
        message: 'Permission denied',
      });
    }
  }
}
