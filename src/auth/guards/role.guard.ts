import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Si no se especifican roles, se permite el acceso
    }
    const { user } = context.switchToHttp().getRequest();
    const userRoles = user?.realm_access?.roles || []; // Obtener roles del token JWT

    // Verificar si el usuario tiene al menos uno de los roles requeridos
    return requiredRoles.some(role => userRoles.includes(role));
  }
}
