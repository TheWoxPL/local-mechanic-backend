export const sessionConfig = {
  secret: process.env.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};
