import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    return this.matchRoles(roles, user.roles);
  }

  matchRoles(roles: string[], userRole: string[]): boolean {
    if (!roles.includes(Role.ADMIN)) return true;
    if (!userRole.includes(Role.ADMIN))
      throw new UnauthorizedException(
        'Need Admin role to perform action on this resource',
      );
    return true;
  }
}
