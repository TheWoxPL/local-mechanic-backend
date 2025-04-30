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
exports.CreateServiceDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const libs_1 = require("../../../libs");
class CreateServiceDTO extends libs_1.BaseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, description: { required: true, type: () => String }, estimatedTime: { required: true, type: () => String }, timeUnitId: { required: true, type: () => String }, serviceAvailabilityId: { required: true, type: () => String }, price: { required: true, type: () => Number }, currencyId: { required: true, type: () => String }, serviceUnitId: { required: true, type: () => String }, companyId: { required: true, type: () => String } };
    }
}
exports.CreateServiceDTO = CreateServiceDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateServiceDTO.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateServiceDTO.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateServiceDTO.prototype, "estimatedTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateServiceDTO.prototype, "timeUnitId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateServiceDTO.prototype, "serviceAvailabilityId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CreateServiceDTO.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateServiceDTO.prototype, "currencyId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateServiceDTO.prototype, "serviceUnitId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateServiceDTO.prototype, "companyId", void 0);
//# sourceMappingURL=create-service.dto.js.map