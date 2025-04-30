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
exports.UserAccountDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const libs_1 = require("../../../libs");
const role_dto_1 = require("../../roles/dtos/role.dto");
class UserAccountDto extends libs_1.AccountBasicDto {
    get fullName() {
        const fullName = [this.firstName, this.lastName].filter(Boolean).join(' ');
        if (fullName) {
            return fullName;
        }
        else {
            return this.email;
        }
    }
    get initials() {
        if (this.firstName && this.lastName) {
            return `${this.firstName[0].toUpperCase()}${this.lastName[0].toUpperCase()}`;
        }
        else if (this.firstName) {
            return `${this.firstName[0].toUpperCase()}`;
        }
        else if (this.lastName) {
            return `${this.lastName[0].toUpperCase()}`;
        }
        else {
            return this.username.slice(0, 1).toUpperCase();
        }
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: false, type: () => String }, lastName: { required: false, type: () => String }, email: { required: true, type: () => String }, role: { required: true, type: () => [require("../../roles/dtos/role.dto").RoleDto] }, status: { required: true, enum: require("../../../libs/shared/enums/system-status.enum").SystemStatus } };
    }
}
exports.UserAccountDto = UserAccountDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserAccountDto.prototype, "firstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserAccountDto.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserAccountDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => role_dto_1.RoleDto),
    __metadata("design:type", Array)
], UserAccountDto.prototype, "role", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], UserAccountDto.prototype, "status", void 0);
//# sourceMappingURL=user-account.dto.js.map