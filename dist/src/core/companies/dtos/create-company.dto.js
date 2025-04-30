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
exports.CreateCompanyDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const libs_1 = require("../../../libs");
class CreateCompanyDTO extends libs_1.BaseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { companyName: { required: true, type: () => String }, description: { required: false, type: () => String }, foundDate: { required: true, type: () => Date }, owners: { required: false, type: () => String }, verifiedOwners: { required: true, type: () => [String] }, workingHours: { required: true, type: () => ({ from: { required: true, type: () => Number }, to: { required: true, type: () => Number } }) } };
    }
}
exports.CreateCompanyDTO = CreateCompanyDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateCompanyDTO.prototype, "companyName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateCompanyDTO.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CreateCompanyDTO.prototype, "foundDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateCompanyDTO.prototype, "owners", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], CreateCompanyDTO.prototype, "verifiedOwners", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], CreateCompanyDTO.prototype, "workingHours", void 0);
//# sourceMappingURL=create-company.dto.js.map