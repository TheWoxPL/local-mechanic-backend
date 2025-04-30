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
exports.StaticDataService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const currency_model_1 = require("../../../models/currency.model");
const currency_dto_1 = require("../dtos/currency.dto");
const class_transformer_1 = require("class-transformer");
const models_1 = require("../../../models");
const service_unit_dto_1 = require("../dtos/service-unit.dto");
const dtos_1 = require("../dtos");
let StaticDataService = class StaticDataService {
    constructor(currencyModel, serviceUnitModel, serviceAvailabilityModel, timeUnitModel) {
        this.currencyModel = currencyModel;
        this.serviceUnitModel = serviceUnitModel;
        this.serviceAvailabilityModel = serviceAvailabilityModel;
        this.timeUnitModel = timeUnitModel;
    }
    async findAllCurrencies() {
        const currencies = await this.currencyModel.find().exec();
        return currencies.map((currency) => (0, class_transformer_1.plainToClass)(currency_dto_1.CurrencyDTO, currency.toObject(), {
            excludeExtraneousValues: true
        }));
    }
    async findAllServiceUnits() {
        const serviceUnits = await this.serviceUnitModel.find().exec();
        return serviceUnits.map((serviceUnit) => (0, class_transformer_1.plainToClass)(service_unit_dto_1.ServiceUnitDTO, serviceUnit.toObject(), {
            excludeExtraneousValues: true
        }));
    }
    async findAllServiceAvailabilities() {
        const serviceAvailabilities = await this.serviceAvailabilityModel
            .find()
            .exec();
        return serviceAvailabilities.map((serviceAvailability) => (0, class_transformer_1.plainToClass)(dtos_1.ServiceAvailabilityDTO, serviceAvailability.toObject(), {
            excludeExtraneousValues: true
        }));
    }
    async findAllTimeUnits() {
        const timeUnits = await this.timeUnitModel.find().exec();
        return timeUnits.map((serviceAvailability) => (0, class_transformer_1.plainToClass)(dtos_1.ServiceAvailabilityDTO, serviceAvailability.toObject(), {
            excludeExtraneousValues: true
        }));
    }
};
exports.StaticDataService = StaticDataService;
exports.StaticDataService = StaticDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(currency_model_1.Currency.name)),
    __param(1, (0, mongoose_1.InjectModel)(models_1.ServiceUnit.name)),
    __param(2, (0, mongoose_1.InjectModel)(models_1.ServiceAvailability.name)),
    __param(3, (0, mongoose_1.InjectModel)(models_1.TimeUnit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], StaticDataService);
//# sourceMappingURL=static-data.service.js.map