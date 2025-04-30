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
exports.ServiceDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const libs_1 = require("../../../libs");
const dtos_1 = require("../../static-data/dtos");
const company_dto_1 = require("../../companies/dtos/company.dto");
class ServiceDTO extends libs_1.BaseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, description: { required: false, type: () => String }, estimatedTime: { required: true, type: () => String }, timeUnit: { required: true, type: () => require("../../static-data/dtos/time-unit.dto").TimeUnitDTO }, serviceAvailability: { required: true, type: () => require("../../static-data/dtos/service-availability.dto").ServiceAvailabilityDTO }, price: { required: true, type: () => Number }, currency: { required: true, type: () => require("../../static-data/dtos/currency.dto").CurrencyDTO }, serviceUnit: { required: true, type: () => require("../../static-data/dtos/service-unit.dto").ServiceUnitDTO }, company: { required: true, type: () => require("../../companies/dtos/company.dto").CompanyDTO } };
    }
}
exports.ServiceDTO = ServiceDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ServiceDTO.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ServiceDTO.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ServiceDTO.prototype, "estimatedTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => dtos_1.TimeUnitDTO),
    __metadata("design:type", dtos_1.TimeUnitDTO)
], ServiceDTO.prototype, "timeUnit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => dtos_1.ServiceAvailabilityDTO),
    __metadata("design:type", dtos_1.ServiceAvailabilityDTO)
], ServiceDTO.prototype, "serviceAvailability", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ServiceDTO.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => dtos_1.CurrencyDTO),
    __metadata("design:type", dtos_1.CurrencyDTO)
], ServiceDTO.prototype, "currency", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => dtos_1.ServiceUnitDTO),
    __metadata("design:type", dtos_1.ServiceUnitDTO)
], ServiceDTO.prototype, "serviceUnit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => company_dto_1.CompanyDTO),
    __metadata("design:type", company_dto_1.CompanyDTO)
], ServiceDTO.prototype, "company", void 0);
//# sourceMappingURL=service.dto.js.map