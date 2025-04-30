"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerSetup = SwaggerSetup;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
function SwaggerSetup(app) {
    const config = new swagger_1.DocumentBuilder()
        .addServer(`http://${process.env.HOST_NAME}:${process.env.HOST_PORT}` || '')
        .setTitle(process.env.SWAGGER_OPENAPI_TITLE || '')
        .setDescription(process.env.SWAGGER_OPENAPI_DESCRIPTION || '')
        .setVersion(process.env.SWAGGER_OPENAPI_VERSION || '')
        .addBearerAuth()
        .build();
    common_1.Logger.debug(`Swagger OpenApi on: http://${process.env.HOST_NAME}:${process.env.HOST_PORT}/api`);
    const documentFactory = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
}
//# sourceMappingURL=swagger-setup.helper.js.map