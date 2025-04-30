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
exports.BasicClass = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const libs_1 = require("../libs");
class BasicClass {
}
exports.BasicClass = BasicClass;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: libs_1.SystemStatus.ACTIVE,
        enum: libs_1.SystemStatus
    }),
    __metadata("design:type", String)
], BasicClass.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now, readonly: true }),
    __metadata("design:type", Date)
], BasicClass.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now }),
    __metadata("design:type", Date)
], BasicClass.prototype, "updatedAt", void 0);
//# sourceMappingURL=basic.model.js.map