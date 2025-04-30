"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const libs_1 = require("./libs");
const session = require("express-session");
const session_config_1 = require("./config/session.config");
const cors_config_1 = require("./config/cors.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors(cors_config_1.corsConfig);
    app.use(session(session_config_1.sessionConfig));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new libs_1.HttpExceptionFilter());
    if (process.env.NODE_ENV === 'development') {
        (0, libs_1.SwaggerSetup)(app);
    }
    const port = process.env.HOST_PORT || '3000';
    await app.listen(port);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`Server running on: http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map