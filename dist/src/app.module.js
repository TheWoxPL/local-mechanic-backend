"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const libs_1 = require("./libs/");
const models_1 = require("./models");
const app_controller_1 = require("./app.controller");
const core_1 = require("@nestjs/core");
const permissions_guard_1 = require("./libs/internal/guards/permissions.guard");
const auth_module_1 = require("./auth/auth.module");
const companies_module_1 = require("./core/companies/companies.module");
const upsert_defaults_module_1 = require("./upsert-defaults/upsert-defaults.module");
const static_data_module_1 = require("./core/static-data/static-data.module");
const service_module_1 = require("./core/service/service.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env.local', '.env'],
                isGlobal: true
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    uri: (0, libs_1.getMongoConnectionString)(configService)
                })
            }),
            mongoose_1.MongooseModule.forFeature(models_1.MongooseModels),
            upsert_defaults_module_1.UpsertDefaultsModule,
            auth_module_1.AuthModule,
            companies_module_1.CompaniesModule,
            static_data_module_1.StaticDataModule,
            service_module_1.ServiceModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: permissions_guard_1.PermissionsGuard
            }
        ],
        exports: []
    })
], AppModule);
//# sourceMappingURL=app.module.js.map