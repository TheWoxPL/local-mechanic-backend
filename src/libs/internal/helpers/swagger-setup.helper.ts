import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';

export function SwaggerSetup(app: INestApplication): void {
  const config = new DocumentBuilder()
    .addServer(`http://${process.env.HOST_NAME}:${process.env.HOST_PORT}` || '')
    .setTitle(process.env.SWAGGER_OPENAPI_TITLE || '')
    .setDescription(process.env.SWAGGER_OPENAPI_DESCRIPTION || '')
    .setVersion(process.env.SWAGGER_OPENAPI_VERSION || '')
    .addBearerAuth()
    .build();

  Logger.debug(
    `Swagger OpenApi on: http://${process.env.HOST_NAME}:${process.env.HOST_PORT}/api`
  );

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
