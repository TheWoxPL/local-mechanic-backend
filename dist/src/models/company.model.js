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
exports.CompanySchema = exports.Company = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_model_1 = require("./base.model");
let Company = class Company extends base_model_1.BaseClass {
};
exports.Company = Company;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Company.prototype, "companyName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Company.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now }),
    __metadata("design:type", Date)
], Company.prototype, "foundDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Company.prototype, "owners", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'UserAccount'
    }),
    __metadata("design:type", String)
], Company.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: [],
        type: [mongoose_2.default.Schema.Types.ObjectId],
        ref: 'UserAccount'
    }),
    __metadata("design:type", Array)
], Company.prototype, "verifiedOwners", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        type: {
            from: Number,
            to: Number
        }
    }),
    __metadata("design:type", Object)
], Company.prototype, "workingHours", void 0);
exports.Company = Company = __decorate([
    (0, mongoose_1.Schema)()
], Company);
exports.CompanySchema = mongoose_1.SchemaFactory.createForClass(Company);
//# sourceMappingURL=company.model.js.map