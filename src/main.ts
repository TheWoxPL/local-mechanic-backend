import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter, SwaggerSetup } from './libs';
import * as session from 'express-session';
import { sessionConfig } from './config/session.config';
import { corsConfig } from './config/cors.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Apply CORS configuration
  app.enableCors(corsConfig);

  // Apply session middleware
  app.use(session(sessionConfig));

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  if (process.env.NODE_ENV === 'development') {
    SwaggerSetup(app);
  }
  await app.listen(3000);

  const logger = new Logger('Bootstrap');
  logger.log(
    `Server running on: http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`
  );
}
bootstrap();
