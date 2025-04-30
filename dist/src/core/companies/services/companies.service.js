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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const company_model_1 = require("../../../models/company.model");
const company_dto_1 = require("../dtos/company.dto");
const accounts_service_1 = require("../../accounts/services/accounts.service");
const libs_1 = require("../../../libs");
let CompaniesService = class CompaniesService {
    constructor(companyModel, accountsService) {
        this.companyModel = companyModel;
        this.accountsService = accountsService;
    }
    async create(createCompanyDto, userEmail) {
        const currentUser = await this.accountsService.findByEmail(userEmail);
        const createCompanyDoc = new this.companyModel();
        createCompanyDoc.companyName = createCompanyDto.companyName;
        createCompanyDoc.description = createCompanyDto.description;
        createCompanyDoc.foundDate = createCompanyDto.foundDate;
        createCompanyDoc.owner = currentUser.id;
        createCompanyDoc.owners = createCompanyDto.owners;
        createCompanyDoc.verifiedOwners = createCompanyDto.verifiedOwners;
        createCompanyDoc.workingHours = createCompanyDto.workingHours;
        createCompanyDoc.createdBy = currentUser.id;
        createCompanyDoc.updatedBy = currentUser.id;
        const result = await createCompanyDoc.save();
        this.accountsService.addRole(libs_1.RoleType.ENTREPRENEUR, userEmail);
        return (0, class_transformer_1.plainToClass)(company_dto_1.CompanyDTO, result, {
            excludeExtraneousValues: true
        });
    }
    async findUserCompanies(userEmail) {
        const currentUser = await this.accountsService.findByEmail(userEmail);
        const result = await this.companyModel
            .find({
            $or: [{ createdBy: currentUser.id }, { verifiedOwners: currentUser.id }]
        })
            .select({
            'workingHours._id': 0
        })
            .populate({
            path: 'workingHours'
        })
            .lean()
            .exec();
        return (0, class_transformer_1.plainToClass)(company_dto_1.CompanyDTO, result, {
            excludeExtraneousValues: true
        });
    }
    async findCompany(uuid) {
        const result = await this.companyModel
            .findOne({ _id: uuid })
            .populate({
            path: 'workingHours'
        })
            .select({
            'workingHours._id': 0
        })
            .lean()
            .exec();
        return (0, class_transformer_1.plainToClass)(company_dto_1.CompanyDTO, result, {
            excludeExtraneousValues: true
        });
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(company_model_1.Company.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        accounts_service_1.AccountsService])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map