"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpsertDefaultsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const upsert_defaults_service_1 = require("./upsert-defaults.service");
const models_1 = require("../models");
const time_unit_model_1 = require("../models/time-unit.model");
const service_availability_model_1 = require("../models/service-availability.model");
let UpsertDefaultsModule = class UpsertDefaultsModule {
};
exports.UpsertDefaultsModule = UpsertDefaultsModule;
exports.UpsertDefaultsModule = UpsertDefaultsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: models_1.UserAccount.name, schema: models_1.UserAccountSchema },
                { name: models_1.Role.name, schema: models_1.RoleSchema },
                { name: models_1.Currency.name, schema: models_1.CurrencySchema },
                { name: time_unit_model_1.TimeUnit.name, schema: time_unit_model_1.TimeUnitSchema },
                { name: service_availability_model_1.ServiceAvailability.name, schema: service_availability_model_1.ServiceAvailabilitySchema },
                { name: models_1.ServiceUnit.name, schema: models_1.ServiceUnitSchema }
            ])
        ],
        providers: [upsert_defaults_service_1.UpsertDefaultsService],
        exports: [upsert_defaults_service_1.UpsertDefaultsService]
    })
], UpsertDefaultsModule);
//# sourceMappingURL=upsert-defaults.module.js.map