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
exports.RoleDto = exports.PermissionRule = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const libs_1 = require("../../../libs");
class PermissionRule {
    static _OPENAPI_METADATA_FACTORY() {
        return { action: { required: true, enum: require("../../../libs/shared/enums/action.enum").Action }, subject: { required: true, enum: require("../../../libs/shared/enums/subject.enum").Subject } };
    }
}
exports.PermissionRule = PermissionRule;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PermissionRule.prototype, "action", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PermissionRule.prototype, "subject", void 0);
class RoleDto extends libs_1.BaseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, code: { required: true, type: () => String }, permissions: { required: true, type: () => [require("./role.dto").PermissionRule] }, status: { required: true, enum: require("../../../libs/shared/enums/system-status.enum").SystemStatus } };
    }
}
exports.RoleDto = RoleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RoleDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RoleDto.prototype, "code", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => PermissionRule),
    __metadata("design:type", Array)
], RoleDto.prototype, "permissions", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], RoleDto.prototype, "status", void 0);
//# sourceMappingURL=role.dto.js.map