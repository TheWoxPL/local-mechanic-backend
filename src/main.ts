import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(`${process.env.HOST_PORT}`);

  const logger = new Logger('Bootstrap');
  logger.log(
    `Server running on: http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`
  );
}
bootstrap();
