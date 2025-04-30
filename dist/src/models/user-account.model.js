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
exports.UserAccountSchema = exports.UserAccount = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const libs_1 = require("../libs");
const base_model_1 = require("./base.model");
let UserAccount = class UserAccount extends base_model_1.BaseClass {
};
exports.UserAccount = UserAccount;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        trim: true,
        sparse: true,
        maxlength: libs_1.FieldConstraints.USERNAME.MAX_LENGTH
    }),
    __metadata("design:type", String)
], UserAccount.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        maxlength: libs_1.FieldConstraints.FIRST_NAME.MAX_LENGTH
    }),
    __metadata("design:type", String)
], UserAccount.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        maxlength: libs_1.FieldConstraints.LAST_NAME.MAX_LENGTH
    }),
    __metadata("design:type", String)
], UserAccount.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], UserAccount.prototype, "avatarUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], UserAccount.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: [],
        type: [mongoose_2.default.Schema.Types.ObjectId],
        ref: 'Role'
    }),
    __metadata("design:type", Array)
], UserAccount.prototype, "role", void 0);
exports.UserAccount = UserAccount = __decorate([
    (0, mongoose_1.Schema)()
], UserAccount);
exports.UserAccountSchema = mongoose_1.SchemaFactory.createForClass(UserAccount);
//# sourceMappingURL=user-account.model.js.map