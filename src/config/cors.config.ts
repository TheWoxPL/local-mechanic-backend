export const corsConfig = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
  origin: (origin: any, callback: any) => {
    const allowedOrigins = [
      process.env.CORS_ORIGIN_DEV,
      process.env.CORS_ORIGIN_PROD
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: process.env.CORS_CREDENTIALS === 'true',
  methods: process.env.CORS_METHODS,
  allowedHeaders: process.env.CORS_HEADERS
};
