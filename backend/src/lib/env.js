import dotenv from "dotenv";

dotenv.config();

const _env = {
  PORT: process.env.PORT,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM: process.env.RESEND_FROM,
  RESEND_FROM_NAME: process.env.RESEND_FROM_NAME,
  CLIENT_URL: process.env.CLIENT_URL,
};

export const ENV = Object.freeze(_env);
