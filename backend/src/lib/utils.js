import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

const generateToken = (userId, res) => {
  const { JWT_SECRET_KEY, NODE_ENV } = ENV;
  if (!JWT_SECRET_KEY) {
    throw new Error("JWT secret key not found");
  }

  const token = jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: "strict", // CSRF attacks
    secure: NODE_ENV === "development" ? false : true,
  });

  return token;
};

export default generateToken;
