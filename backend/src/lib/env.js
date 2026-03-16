import dotenv from "dotenv";

dotenv.config();

const _env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,

  MONGO_DB_URI: process.env.MONGO_DB_URI,
  CLIENT_URL: process.env.CLIENT_URL,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM: process.env.RESEND_FROM,
  RESEND_FROM_NAME: process.env.RESEND_FROM_NAME,

  CLOUDINARY_CLOUD_NAME: process.env.CLIENT_URL,
  CLOUDINARY_FOLDER_NAME: process.env.CLIENT_URL,
  CLOUDINARY_API_KEY: process.env.CLIENT_URL,
  CLOUDINARY_API_SECRET: process.env.CLIENT_URL,

  ARCJET_ENV: process.env.ARCJET_ENV,
  ARCJET_KEY: process.env.ARCJET_KEY,
};

export const ENV = Object.freeze(_env);
