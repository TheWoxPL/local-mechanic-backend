"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const shared_1 = require("../../shared");
const auth_service_1 = require("../../../auth/auth.service");
let PermissionsGuard = class PermissionsGuard {
    constructor(reflector, authService) {
        this.reflector = reflector;
        this.authService = authService;
    }
    matchRoles(requiredPermissions, sessionPermissions) {
        if (!sessionPermissions || !sessionPermissions.length) {
            throw new common_1.ForbiddenException('Invalid permissions');
        }
        const isAdmin = sessionPermissions.some((perm) => perm.subject === shared_1.Subject.ALL && perm.action === shared_1.Action.MANAGE);
        if (isAdmin) {
            return true;
        }
        const hasPermission = requiredPermissions.every((neededPermission) => sessionPermissions.some((sessionPermission) => sessionPermission.subject === neededPermission.subject &&
            sessionPermission.action === neededPermission.action));
        if (!hasPermission) {
            throw new common_1.ForbiddenException('Invalid permissions');
        }
        return true;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        const requiredPermissions = this.reflector.get(shared_1.PERMISSION_KEY, context.getHandler()) ||
            this.reflector.get(shared_1.PERMISSION_KEY, context.getClass());
        if (!requiredPermissions || !requiredPermissions.length) {
            return true;
        }
        if (!token)
            throw new common_1.UnauthorizedException('No token provided');
        try {
            const decodedToken = await this.authService.verifyToken(token, request);
            request.user = decodedToken;
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error);
        }
        const session = request.session;
        return this.matchRoles(requiredPermissions, session.user.permissions || []);
    }
};
exports.PermissionsGuard = PermissionsGuard;
exports.PermissionsGuard = PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService])
], PermissionsGuard);
//# sourceMappingURL=permissions.guard.js.map