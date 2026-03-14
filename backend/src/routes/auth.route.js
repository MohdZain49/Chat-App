import express from "express";
import { signup } from "../controllers/user.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);

export default authRouter;
