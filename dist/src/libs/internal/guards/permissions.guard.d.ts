import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequiredPermissions } from '../../shared';
import { AuthService } from 'src/auth/auth.service';
export declare class PermissionsGuard implements CanActivate {
    private reflector;
    private readonly authService;
    constructor(reflector: Reflector, authService: AuthService);
    matchRoles(requiredPermissions: RequiredPermissions[], sessionPermissions: RequiredPermissions[]): boolean;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
