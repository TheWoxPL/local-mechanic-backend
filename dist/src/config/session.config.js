"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = void 0;
exports.sessionConfig = {
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true,
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};
//# sourceMappingURL=session.config.js.map