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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("../services/accounts.service");
const common_2 = require("@nestjs/common");
const libs_1 = require("../../../libs");
let AccountsController = class AccountsController {
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    async addCustomerRole(req) {
        return await this.accountsService.addRole(libs_1.RoleType.CUSTOMER, req.session.user.email);
    }
    async addEntrepreneurRole(req) {
        return await this.accountsService.addRole(libs_1.RoleType.ENTREPRENEUR, req.session.user.email);
    }
};
exports.AccountsController = AccountsController;
__decorate([
    (0, libs_1.Permissions)(libs_1.AppPermissions.APP.DISPLAY),
    (0, common_2.Post)('add-customer-role'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "addCustomerRole", null);
__decorate([
    (0, libs_1.Permissions)(libs_1.AppPermissions.APP.DISPLAY),
    (0, common_2.Post)('add-entrepreneur-role'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "addEntrepreneurRole", null);
exports.AccountsController = AccountsController = __decorate([
    (0, common_1.Controller)('accounts'),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsController);
//# sourceMappingURL=accounts.controller.js.map