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
exports.StaticDataController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const static_data_service_1 = require("../services/static-data.service");
let StaticDataController = class StaticDataController {
    constructor(staticDataService) {
        this.staticDataService = staticDataService;
    }
    async getCurrencies() {
        const result = await this.staticDataService.findAllCurrencies();
        return result;
    }
    async getServiceUnits() {
        const result = await this.staticDataService.findAllServiceUnits();
        return result;
    }
    async getServiceAvailabilities() {
        const result = await this.staticDataService.findAllServiceAvailabilities();
        return result;
    }
    async getTimeUnits() {
        const result = await this.staticDataService.findAllTimeUnits();
        return result;
    }
};
exports.StaticDataController = StaticDataController;
__decorate([
    (0, common_1.Get)('get-currencies'),
    openapi.ApiResponse({ status: 200, type: [require("../dtos/currency.dto").CurrencyDTO] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaticDataController.prototype, "getCurrencies", null);
__decorate([
    (0, common_1.Get)('get-service-units'),
    openapi.ApiResponse({ status: 200, type: [require("../dtos/service-unit.dto").ServiceUnitDTO] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaticDataController.prototype, "getServiceUnits", null);
__decorate([
    (0, common_1.Get)('get-service-availabilities'),
    openapi.ApiResponse({ status: 200, type: [require("../dtos/service-availability.dto").ServiceAvailabilityDTO] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaticDataController.prototype, "getServiceAvailabilities", null);
__decorate([
    (0, common_1.Get)('get-time-units'),
    openapi.ApiResponse({ status: 200, type: [require("../dtos/time-unit.dto").TimeUnitDTO] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaticDataController.prototype, "getTimeUnits", null);
exports.StaticDataController = StaticDataController = __decorate([
    (0, common_1.Controller)('static-data'),
    __metadata("design:paramtypes", [static_data_service_1.StaticDataService])
], StaticDataController);
//# sourceMappingURL=static-data.controller.js.map