"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppPermissions = void 0;
const enums_1 = require("../enums/");
class AppPermissions {
}
exports.AppPermissions = AppPermissions;
AppPermissions.ADMIN = {
    action: enums_1.Action.MANAGE,
    subject: enums_1.Subject.ALL
};
AppPermissions.ROLES = {
    MANAGE: {
        action: enums_1.Action.MANAGE,
        subject: enums_1.Subject.ROLES
    },
    DISPLAY: {
        action: enums_1.Action.DISPLAY,
        subject: enums_1.Subject.ROLES
    }
};
AppPermissions.ACCOUNTS = {
    MANAGE: {
        action: enums_1.Action.MANAGE,
        subject: enums_1.Subject.ACCOUNTS
    },
    DISPLAY: {
        action: enums_1.Action.DISPLAY,
        subject: enums_1.Subject.ACCOUNTS
    }
};
AppPermissions.APP = {
    DISPLAY: {
        action: enums_1.Action.DISPLAY,
        subject: enums_1.Subject.ALL
    }
};
//# sourceMappingURL=permissions.const.js.map