"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseModels = void 0;
const role_model_1 = require("./role.model");
const user_account_model_1 = require("./user-account.model");
const company_model_1 = require("./company.model");
const currency_model_1 = require("./currency.model");
const service_unit_model_1 = require("./service-unit.model");
const service_availability_model_1 = require("./service-availability.model");
const time_unit_model_1 = require("./time-unit.model");
const service_model_1 = require("./service.model");
__exportStar(require("./role.model"), exports);
__exportStar(require("./user-account.model"), exports);
__exportStar(require("./company.model"), exports);
__exportStar(require("./currency.model"), exports);
__exportStar(require("./service-unit.model"), exports);
__exportStar(require("./service-availability.model"), exports);
__exportStar(require("./time-unit.model"), exports);
exports.MongooseModels = [
    {
        name: role_model_1.Role.name,
        schema: role_model_1.RoleSchema,
        collection: 'roles'
    },
    {
        name: user_account_model_1.UserAccount.name,
        schema: user_account_model_1.UserAccountSchema,
        collection: 'userAccounts'
    },
    {
        name: company_model_1.Company.name,
        schema: company_model_1.CompanySchema,
        collection: 'companies'
    },
    {
        name: currency_model_1.Currency.name,
        schema: currency_model_1.CurrencySchema,
        collection: 'currencies'
    },
    {
        name: service_unit_model_1.ServiceUnit.name,
        schema: service_unit_model_1.ServiceUnitSchema,
        collection: 'serviceUnits'
    },
    {
        name: service_availability_model_1.ServiceAvailability.name,
        schema: service_availability_model_1.ServiceAvailabilitySchema,
        collection: 'serviceAvailabilities'
    },
    {
        name: time_unit_model_1.TimeUnit.name,
        schema: time_unit_model_1.TimeUnitSchema,
        collection: 'timeUnits'
    },
    {
        name: service_model_1.Service.name,
        schema: service_model_1.ServiceSchema,
        collection: 'services'
    }
];
//# sourceMappingURL=index.js.map