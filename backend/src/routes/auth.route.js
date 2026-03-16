import express from "express";
import arcjetProtection from "../middlewares/arcjet.middleware.js";
import protectRoute from "../middlewares/auth.middleware.js";

import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/user.controller.js";

const authRouter = express.Router();

authRouter.use(arcjetProtection);

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/update-profile", protectRoute, updateProfile);

authRouter.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default authRouter;
