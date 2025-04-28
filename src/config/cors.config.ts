export const corsConfig = {
  origin: '*',
  methods: process.env.CORS_METHODS,
  allowedHeaders: process.env.CORS_HEADERS,
  credentials: process.env.CORS_CREDENTIALS === 'true'
};
