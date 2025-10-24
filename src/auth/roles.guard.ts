// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      ctx.getHandler(),
    );
    if (!requiredRoles) return true;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return requiredRoles.includes(user.role);
  }
}
