"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldConstraints = void 0;
class FieldConstraints {
}
exports.FieldConstraints = FieldConstraints;
FieldConstraints.FIRST_NAME = {
    MAX_LENGTH: 50
};
FieldConstraints.LAST_NAME = {
    MAX_LENGTH: 50
};
FieldConstraints.USERNAME = {
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9-_]+$/
};
FieldConstraints.NAME = {
    MAX_LENGTH: 50
};
FieldConstraints.ACTION = {
    MAX_LENGTH: 30
};
FieldConstraints.SUBJECT = {
    MAX_LENGTH: 30
};
FieldConstraints.EMAIL = {
    MAX_LENGTH: 120
};
FieldConstraints.CONTENT = {
    PATTERN: /^[a-zA-Z0-9]{6}$/
};
//# sourceMappingURL=fields-contraints.const.js.map