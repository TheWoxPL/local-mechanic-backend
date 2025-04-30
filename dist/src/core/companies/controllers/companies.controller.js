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
exports.CompaniesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const companies_service_1 = require("../services/companies.service");
const create_company_dto_1 = require("../dtos/create-company.dto");
const libs_1 = require("../../../libs");
let CompaniesController = class CompaniesController {
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    async addCompany(createCompanyDto, req) {
        const result = await this.companiesService.create(createCompanyDto, req.session.user.email);
        return result;
    }
    async getCompanies(req) {
        const result = await this.companiesService.findUserCompanies(req.session.user.email);
        return result;
    }
    async getCompany(uuid) {
        const result = await this.companiesService.findCompany(uuid);
        return result;
    }
};
exports.CompaniesController = CompaniesController;
__decorate([
    (0, libs_1.Permissions)(libs_1.AppPermissions.APP.DISPLAY),
    (0, common_2.Post)('add-company'),
    openapi.ApiResponse({ status: 201, type: require("../dtos/company.dto").CompanyDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDTO, Object]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "addCompany", null);
__decorate([
    (0, libs_1.Permissions)(libs_1.AppPermissions.APP.DISPLAY),
    (0, common_1.Get)('get-user-companies'),
    openapi.ApiResponse({ status: 200, type: [require("../dtos/company.dto").CompanyDTO] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "getCompanies", null);
__decorate([
    (0, common_1.Get)('get-company/:uuid'),
    openapi.ApiResponse({ status: 200, type: require("../dtos/company.dto").CompanyDTO }),
    __param(0, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "getCompany", null);
exports.CompaniesController = CompaniesController = __decorate([
    (0, common_1.Controller)('companies'),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], CompaniesController);
//# sourceMappingURL=companies.controller.js.map