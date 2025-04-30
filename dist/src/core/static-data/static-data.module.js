"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticDataModule = void 0;
const common_1 = require("@nestjs/common");
const static_data_controller_1 = require("./controllers/static-data.controller");
const static_data_service_1 = require("./services/static-data.service");
const models_1 = require("../../models");
const mongoose_1 = require("@nestjs/mongoose");
let StaticDataModule = class StaticDataModule {
};
exports.StaticDataModule = StaticDataModule;
exports.StaticDataModule = StaticDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: models_1.Currency.name, schema: models_1.CurrencySchema },
                { name: models_1.ServiceUnit.name, schema: models_1.ServiceUnitSchema },
                { name: models_1.ServiceAvailability.name, schema: models_1.ServiceAvailabilitySchema },
                { name: models_1.TimeUnit.name, schema: models_1.TimeUnitSchema }
            ])
        ],
        controllers: [static_data_controller_1.StaticDataController],
        providers: [static_data_service_1.StaticDataService]
    })
], StaticDataModule);
//# sourceMappingURL=static-data.module.js.map