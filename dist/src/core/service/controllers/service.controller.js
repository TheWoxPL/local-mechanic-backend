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
exports.ServiceController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const service_service_1 = require("../services/service.service");
const libs_1 = require("../../../libs");
const dto_1 = require("../dto/");
const swagger_1 = require("@nestjs/swagger");
let ServiceController = class ServiceController {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    async addService(createServiceDTO, req) {
        const result = await this.serviceService.createService(createServiceDTO, req.session.user.id);
        return result;
    }
    async getAllServicesByCompanyId(companyId) {
        const result = await this.serviceService.findServicesByCompanyId(companyId);
        return result;
    }
    async removeService(serviceId, req, res) {
        try {
            await this.serviceService.removeServiceById(serviceId, req.session.user.id);
            return res.status(200).json({ message: 'Service successfully removed' });
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                return res
                    .status(403)
                    .json({ message: 'You are not allowed to remove this service' });
            }
            return res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
    async generateServicesForUser() {
        const result = await this.serviceService.generateServicesForUser();
        return result;
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, libs_1.Permissions)(libs_1.AppPermissions.APP.DISPLAY),
    (0, common_1.Post)('add-service'),
    openapi.ApiResponse({ status: 201, type: require("../dto/service.dto").ServiceDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateServiceDTO, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "addService", null);
__decorate([
    (0, common_1.Get)('get-services/:companyId'),
    openapi.ApiResponse({ status: 200, type: [require("../dto/service.dto").ServiceDTO] }),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getAllServicesByCompanyId", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, libs_1.Permissions)(libs_1.AppPermissions.APP.DISPLAY),
    (0, common_1.Delete)(':serviceId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('serviceId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "removeService", null);
__decorate([
    (0, common_1.Get)('generate-services-for-user'),
    openapi.ApiResponse({ status: 200, type: [require("../dto/service.dto").ServiceDTO] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "generateServicesForUser", null);
exports.ServiceController = ServiceController = __decorate([
    (0, common_1.Controller)('services'),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceController);
//# sourceMappingURL=service.controller.js.map