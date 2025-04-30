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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const models_1 = require("../../../models");
const upsert_defaults_service_1 = require("../../../upsert-defaults/upsert-defaults.service");
const dtos_1 = require("../dtos");
const libs_1 = require("../../../libs");
let AccountsService = class AccountsService {
    constructor(userAccountModel, upsertDefaultsService) {
        this.userAccountModel = userAccountModel;
        this.upsertDefaultsService = upsertDefaultsService;
    }
    async create(createUserAccountDto) {
        const systemUser = (await this.upsertDefaultsService.getSystemAccount()).id;
        const customerRole = await this.upsertDefaultsService.getCustomerRole();
        if (!customerRole) {
            throw new common_1.ConflictException('Customer role not found');
        }
        const createUserAccountDoc = new this.userAccountModel();
        createUserAccountDoc.email = createUserAccountDto.email;
        createUserAccountDoc.username = createUserAccountDto.email.split('@')[0];
        createUserAccountDoc.firstName = createUserAccountDto.firstName;
        createUserAccountDoc.lastName = createUserAccountDto.lastName;
        createUserAccountDoc.role = [customerRole.id];
        createUserAccountDoc.createdBy = systemUser;
        createUserAccountDoc.updatedBy = systemUser;
        const result = await createUserAccountDoc.save();
        return (0, class_transformer_1.plainToClass)(dtos_1.UserAccountDto, result, {
            excludeExtraneousValues: true
        });
    }
    async findById(id) {
        const userAccount = await this.userAccountModel
            .findById(id)
            .populate('createdBy updatedBy role')
            .lean()
            .exec();
        const userAccountDto = (0, class_transformer_1.plainToClass)(dtos_1.UserAccountDto, userAccount, {
            excludeExtraneousValues: true
        });
        return userAccountDto;
    }
    async findByEmail(email) {
        const userAccount = await this.userAccountModel
            .findOne({ email })
            .populate('createdBy updatedBy role')
            .lean()
            .exec();
        const userAccountDto = (0, class_transformer_1.plainToClass)(dtos_1.UserAccountDto, userAccount, {
            excludeExtraneousValues: true
        });
        return userAccountDto;
    }
    async addRole(roleName, email) {
        const role = roleName === libs_1.RoleType.CUSTOMER
            ? await this.upsertDefaultsService.getCustomerRole()
            : await this.upsertDefaultsService.getEntrepreneurRole();
        if (!role) {
            throw new common_1.ConflictException('Role not found.');
        }
        const userAccount = await this.userAccountModel.findOne({ email }).exec();
        if (!userAccount.role.includes(role.id)) {
            userAccount.role.push(role.id);
            await userAccount.save();
            return `${roleName} role added.`;
        }
        return `${roleName} role already exists.`;
    }
    async hasAnyRoleByEmail(email) {
        const userAccount = await this.userAccountModel
            .findOne({ email })
            .lean()
            .exec();
        if (userAccount.role.length > 0) {
            return true;
        }
        return false;
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.UserAccount.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        upsert_defaults_service_1.UpsertDefaultsService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map