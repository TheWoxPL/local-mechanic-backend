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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../dto");
const companies_service_1 = require("../../companies/services/companies.service");
const mongoose_1 = require("@nestjs/mongoose");
const service_model_1 = require("../../../models/service.model");
const mongoose_2 = require("mongoose");
const class_transformer_1 = require("class-transformer");
let ServiceService = class ServiceService {
    constructor(serviceModel, companiesService) {
        this.serviceModel = serviceModel;
        this.companiesService = companiesService;
    }
    async createService(createServiceDTO, userId) {
        const givenCompany = await this.companiesService.findCompany(createServiceDTO.companyId);
        if (givenCompany.owner.id !== userId) {
            throw new Error('You are not the owner of this company');
        }
        const createServiceDoc = new this.serviceModel();
        createServiceDoc.title = createServiceDTO.title;
        createServiceDoc.description = createServiceDTO.description;
        createServiceDoc.estimatedTime = createServiceDTO.estimatedTime;
        createServiceDoc.timeUnit = createServiceDTO.timeUnitId;
        createServiceDoc.serviceAvailability =
            createServiceDTO.serviceAvailabilityId;
        createServiceDoc.price = createServiceDTO.price;
        createServiceDoc.currency = createServiceDTO.currencyId;
        createServiceDoc.serviceUnit = createServiceDTO.serviceUnitId;
        createServiceDoc.company = createServiceDTO.companyId;
        const result = await createServiceDoc.save();
        return (0, class_transformer_1.plainToClass)(dto_1.ServiceDTO, result, {
            excludeExtraneousValues: true
        });
    }
    async findServicesByCompanyId(companyId) {
        const result = await this.serviceModel
            .find({ company: companyId })
            .populate([
            'currency',
            'timeUnit',
            'serviceUnit',
            'serviceAvailability',
            'company'
        ])
            .lean()
            .exec();
        const services = result.map((service) => (0, class_transformer_1.plainToClass)(dto_1.ServiceDTO, service, {
            excludeExtraneousValues: true
        }));
        return services;
    }
    async findServiceById(serviceId) {
        const result = await this.serviceModel
            .findById(serviceId)
            .populate([
            'currency',
            'timeUnit',
            'serviceUnit',
            'serviceAvailability',
            'company'
        ])
            .lean()
            .exec();
        return (0, class_transformer_1.plainToClass)(dto_1.ServiceDTO, result, {
            excludeExtraneousValues: true
        });
    }
    async removeServiceById(serviceId, userId) {
        const givenService = await this.findServiceById(serviceId);
        const givenCompany = await this.companiesService.findCompany(givenService.company.id);
        if (givenCompany.owner.id !== userId) {
            throw new common_1.ForbiddenException();
        }
        await this.serviceModel.findByIdAndDelete(serviceId).exec();
    }
    async generateServicesForUser() {
        const result = await this.serviceModel
            .find({})
            .limit(50)
            .populate([
            'currency',
            'timeUnit',
            'serviceUnit',
            'serviceAvailability',
            'company'
        ])
            .lean()
            .exec();
        const shuffled = result.sort(() => Math.random() - 0.5);
        const services = shuffled.map((service) => (0, class_transformer_1.plainToClass)(dto_1.ServiceDTO, service, {
            excludeExtraneousValues: true
        }));
        return services;
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(service_model_1.Service.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        companies_service_1.CompaniesService])
], ServiceService);
//# sourceMappingURL=service.service.js.map