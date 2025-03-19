import {ValidationPipe, Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpExceptionFilter, SwaggerSetup} from './libs';
import {corsConfig, sessionConfig} from './config';
import * as session from 'express-session';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // TODO: move config below to other file
  app.use(session(sessionConfig));
  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  if (process.env.NODE_ENV === 'development') {
    SwaggerSetup(app);
  }
  await app.listen(`${process.env.HOST_PORT}`);

  const logger = new Logger('Bootstrap');
  logger.log(
    `Server running on: http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`
  );
}
bootstrap();
