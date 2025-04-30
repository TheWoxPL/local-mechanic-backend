"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
exports.corsConfig = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.CORS_ORIGIN_DEV,
            process.env.CORS_ORIGIN_PROD
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: process.env.CORS_CREDENTIALS === 'true',
    methods: process.env.CORS_METHODS,
    allowedHeaders: process.env.CORS_HEADERS
};
//# sourceMappingURL=cors.config.js.map