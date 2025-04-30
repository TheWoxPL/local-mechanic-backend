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
exports.AppController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const libs_1 = require("./libs");
const permissions_decorator_1 = require("./libs/shared/decorators/permissions.decorator");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
    getHello() {
        return 'Hello World!';
    }
    getAdminRoute() {
        return 'This is an admin route';
    }
    getCustomerRoute() {
        return 'This is a customer route';
    }
    getEntrepreneurRoute() {
        return 'This is a entrepreneur route';
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('admin-route'),
    (0, permissions_decorator_1.Permissions)(libs_1.AppPermissions.ADMIN),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getAdminRoute", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('customer-route'),
    (0, permissions_decorator_1.Permissions)(libs_1.AppPermissions.APP.DISPLAY),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getCustomerRoute", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('entrepreneur-route'),
    (0, permissions_decorator_1.Permissions)(libs_1.AppPermissions.APP.DISPLAY),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getEntrepreneurRoute", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map