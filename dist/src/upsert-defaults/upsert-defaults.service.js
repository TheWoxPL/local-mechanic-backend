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
exports.UpsertDefaultsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const models_1 = require("../models");
const libs_1 = require("../libs");
const dtos_1 = require("../core/accounts/dtos");
const class_transformer_1 = require("class-transformer");
const defaultData_1 = require("./defaultData");
const service_availability_model_1 = require("../models/service-availability.model");
let UpsertDefaultsService = class UpsertDefaultsService {
    constructor(connection, userAccountModel, roleModel, currencyModel, serviceUnitModel, serviceAvailabilityModel, timeUnitModel) {
        this.connection = connection;
        this.userAccountModel = userAccountModel;
        this.roleModel = roleModel;
        this.currencyModel = currencyModel;
        this.serviceUnitModel = serviceUnitModel;
        this.serviceAvailabilityModel = serviceAvailabilityModel;
        this.timeUnitModel = timeUnitModel;
        common_1.Logger.debug('[UpsertDefaultsService] Constructor called');
    }
    async onModuleInit() {
        common_1.Logger.debug('[UpsertDefaultsService] OnModuleInit called');
        await this.upsertDefaultModels();
        await this.upsertSystemAccount();
        await this.createRoles();
        await this.upsertAdminAccount();
        await this.upsertDefaultData();
    }
    async upsertDocuments(model, documents, uniqueKey) {
        for (const document of documents) {
            const query = {
                [uniqueKey]: document[uniqueKey]
            };
            const existingDocument = await model.findOne(query).exec();
            if (!existingDocument) {
                await model.create(document);
                common_1.Logger.debug(`[UpsertService] Document added: ${JSON.stringify(document)}`);
            }
            else {
                common_1.Logger.debug(`[UpsertService] Document already exists: ${JSON.stringify(document)}`);
            }
        }
    }
    async upsertDefaultData() {
        const collections = [
            {
                model: this.currencyModel,
                data: defaultData_1.DefaultData.currencies,
                uniqueKey: 'name'
            },
            {
                model: this.serviceUnitModel,
                data: defaultData_1.DefaultData.serviceUnits,
                uniqueKey: 'name'
            },
            {
                model: this.serviceAvailabilityModel,
                data: defaultData_1.DefaultData.serviceAvailabilities,
                uniqueKey: 'name'
            },
            {
                model: this.timeUnitModel,
                data: defaultData_1.DefaultData.timeUnits,
                uniqueKey: 'name'
            }
        ];
        for (const { model, data, uniqueKey } of collections) {
            await this.upsertDocuments(model, data, uniqueKey);
        }
    }
    async upsertDefaultModels() {
        try {
            const dbName = process.env.NODE_ENV === 'development'
                ? process.env.MONGODB_DATABASE_DEV
                : process.env.MONGODB_DATABASE;
            if (!dbName) {
                throw new Error('Database name is not defined in environment variables');
            }
            const db = this.connection.useDb(dbName, {
                useCache: true
            });
            if (!db.db) {
                throw new Error('Database connection is not established');
            }
            const collections = await db.db.listCollections().toArray();
            const collectionNames = Object.keys(defaultData_1.DefaultData);
            for (const collectionName of collectionNames) {
                if (!collections.some((collection) => collection.name === collectionName)) {
                    await db.createCollection(collectionName);
                    common_1.Logger.debug(`[UpsertService] Collection ${collectionName} created.`);
                }
            }
        }
        catch (error) {
            common_1.Logger.error(`[UpsertService] Error during upsertDefaults: ${error}`);
            throw error;
        }
    }
    async upsertSystemAccount() {
        if (!this.systemAccount) {
            const username = 'SYSTEM';
            let systemAccount = await this.userAccountModel
                .findOne({ username })
                .exec();
            if (!systemAccount) {
                systemAccount = new this.userAccountModel();
                systemAccount.username = username;
                systemAccount.updatedAt = new Date();
                systemAccount.createdAt = new Date();
                systemAccount.updatedBy = systemAccount.id;
                systemAccount.createdBy = systemAccount.id;
                systemAccount.email = 'system@local-mechanic-service.com';
                systemAccount.role = [];
                await systemAccount.save();
                common_1.Logger.debug('[UpsertService] System account added');
            }
            this.systemAccount = systemAccount;
        }
        return this.systemAccount;
    }
    async upsertAdminAccount() {
        if (!this.adminAccount) {
            const username = 'ADMIN';
            let adminAccount = await this.userAccountModel
                .findOne({ username })
                .exec();
            if (!adminAccount) {
                adminAccount = new this.userAccountModel();
                const adminRole = await this.getAdminRole();
                if (!adminRole)
                    throw new Error('Admin role not found');
                adminAccount.username = username;
                adminAccount.updatedAt = new Date();
                adminAccount.createdAt = new Date();
                adminAccount.updatedBy = (await this.getSystemAccount()).id;
                adminAccount.createdBy = (await this.getSystemAccount()).id;
                adminAccount.role = [adminRole.id];
                adminAccount.email = 'admin@local-mechanic-service.com';
                await adminAccount.save();
                common_1.Logger.debug('[UpsertService] Default admin account added');
            }
            this.adminAccount = adminAccount;
        }
        return this.adminAccount;
    }
    async createRoles() {
        await this.createRoleIfNotExists(libs_1.RoleType.ENTREPRENEUR, [
            libs_1.AppPermissions.APP.DISPLAY
        ]);
        await this.createRoleIfNotExists(libs_1.RoleType.CUSTOMER, [
            libs_1.AppPermissions.APP.DISPLAY
        ]);
        await this.createRoleIfNotExists(libs_1.RoleType.ADMIN, [libs_1.AppPermissions.ADMIN]);
    }
    async getSystemAccount() {
        const systemAccount = await this.upsertSystemAccount();
        return (0, class_transformer_1.plainToClass)(dtos_1.UserAccountDto, systemAccount, {
            excludeExtraneousValues: true
        });
    }
    async createRoleIfNotExists(name, permissions) {
        const role = await this.roleModel.findOne({ name });
        if (!role) {
            const systemUser = new mongoose_3.Types.ObjectId((await this.getSystemAccount()).id);
            const newRole = new this.roleModel({
                name,
                permissions,
                createdBy: systemUser,
                updatedBy: systemUser
            });
            await newRole.save();
            common_1.Logger.debug(`[UpsertService] Role ${name} created.`);
        }
        else {
            common_1.Logger.debug(`[UpsertService] Role ${name} already exists.`);
        }
    }
    async getCustomerRole() {
        return this.roleModel.findOne({ name: libs_1.RoleType.CUSTOMER }).exec();
    }
    async getEntrepreneurRole() {
        return this.roleModel.findOne({ name: libs_1.RoleType.ENTREPRENEUR }).exec();
    }
    async getAdminRole() {
        return this.roleModel.findOne({ name: libs_1.RoleType.ADMIN }).exec();
    }
};
exports.UpsertDefaultsService = UpsertDefaultsService;
exports.UpsertDefaultsService = UpsertDefaultsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __param(1, (0, mongoose_1.InjectModel)(models_1.UserAccount.name)),
    __param(2, (0, mongoose_1.InjectModel)(models_1.Role.name)),
    __param(3, (0, mongoose_1.InjectModel)(models_1.Currency.name)),
    __param(4, (0, mongoose_1.InjectModel)(models_1.ServiceUnit.name)),
    __param(5, (0, mongoose_1.InjectModel)(service_availability_model_1.ServiceAvailability.name)),
    __param(6, (0, mongoose_1.InjectModel)(models_1.TimeUnit.name)),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UpsertDefaultsService);
//# sourceMappingURL=upsert-defaults.service.js.map