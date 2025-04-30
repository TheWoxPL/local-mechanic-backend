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
exports.RoleSchema = exports.Role = exports.PermissionRule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const libs_1 = require("../libs");
const base_model_1 = require("./base.model");
class PermissionRule {
}
exports.PermissionRule = PermissionRule;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        trim: true,
        lowercase: true
    }),
    __metadata("design:type", String)
], PermissionRule.prototype, "action", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        trim: true,
        lowercase: true
    }),
    __metadata("design:type", String)
], PermissionRule.prototype, "subject", void 0);
let Role = class Role extends base_model_1.BaseClass {
};
exports.Role = Role;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        trim: true,
        maxlength: libs_1.FieldConstraints.NAME.MAX_LENGTH
    }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        type: () => Object,
        _id: false,
        set: (value) => {
            if (value instanceof Array) {
                return value;
            }
            else {
                return [value];
            }
        }
    }),
    __metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
exports.Role = Role = __decorate([
    (0, mongoose_1.Schema)()
], Role);
exports.RoleSchema = mongoose_1.SchemaFactory.createForClass(Role);
//# sourceMappingURL=role.model.js.map