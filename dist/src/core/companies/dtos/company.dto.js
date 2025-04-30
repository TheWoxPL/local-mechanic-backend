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
exports.CompanyDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const libs_1 = require("../../../libs");
const dtos_1 = require("../../accounts/dtos");
class CompanyDTO extends libs_1.BaseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { companyName: { required: true, type: () => String }, description: { required: false, type: () => String }, foundDate: { required: true, type: () => Date }, owner: { required: true, type: () => require("../../accounts/dtos/user-account.dto").UserAccountDto }, owners: { required: false, type: () => String }, verifiedOwners: { required: true, type: () => [String] }, workingHours: { required: true, type: () => ({ from: { required: true, type: () => Number }, to: { required: true, type: () => Number } }) } };
    }
}
exports.CompanyDTO = CompanyDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyDTO.prototype, "companyName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyDTO.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CompanyDTO.prototype, "foundDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => dtos_1.UserAccountDto),
    __metadata("design:type", dtos_1.UserAccountDto)
], CompanyDTO.prototype, "owner", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyDTO.prototype, "owners", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], CompanyDTO.prototype, "verifiedOwners", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], CompanyDTO.prototype, "workingHours", void 0);
//# sourceMappingURL=company.dto.js.map