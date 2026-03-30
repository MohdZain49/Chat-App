import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ENV } from "./lib/env.js";

import connectDataBase from "./lib/db.js";

import arcjetProtection from "./middlewares/arcjet.middleware.js";

import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();

app.use(express.json({ limit: "10mb" })); 

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(arcjetProtection);

app.get("/", (_, res) => res.send("MERN Chat Application"));
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

const PORT = ENV.PORT || 3002;

connectDataBase()
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)),
  )
  .catch((err) => console.error("Failed to run server", err));
