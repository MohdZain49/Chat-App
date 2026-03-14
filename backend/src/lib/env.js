import dotenv from "dotenv";

dotenv.config();

const _env = {
  PORT: process.env.PORT,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

export const ENV = Object.freeze(_env);
