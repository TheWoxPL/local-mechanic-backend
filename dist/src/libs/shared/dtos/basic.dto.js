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
exports.BasicDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
let BasicDto = class BasicDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
};
exports.BasicDto = BasicDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value, obj }) => {
        if (value && typeof value === 'string') {
            return value;
        }
        else if (obj._id) {
            return typeof obj._id === 'string' ? obj._id : obj._id.toString();
        }
        else {
            return undefined;
        }
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], BasicDto.prototype, "id", void 0);
exports.BasicDto = BasicDto = __decorate([
    (0, class_transformer_1.Exclude)()
], BasicDto);
//# sourceMappingURL=basic.dto.js.map