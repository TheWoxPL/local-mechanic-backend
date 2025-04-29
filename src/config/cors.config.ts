import { Logger } from '@nestjs/common';

export const corsConfig = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
  origin: (origin: any, callback: any) => {
    const allowedOrigins = [
      process.env.CORS_ORIGIN_DEV,
      process.env.CORS_ORIGIN_PROD
    ];
    const logger = new Logger('CORS');
    logger.log(`CORS check: Origin=${origin || 'none'}`);
    if (!origin || allowedOrigins.includes(origin)) {
      logger.log(`CORS allowed: Origin=${origin || 'none'}`);
      callback(null, true);
    } else {
      logger.warn(`CORS rejected: Origin=${origin || 'none'}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: process.env.CORS_CREDENTIALS === 'true',
  methods: process.env.CORS_METHODS,
  allowedHeaders: process.env.CORS_HEADERS
};
