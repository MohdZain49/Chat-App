import express from "express";
import cookieParser from "cookie-parser";
import connectDataBase from "./lib/db.js";
import { ENV } from "./lib/env.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => res.send("MERN Chat Application"));
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter)

const PORT = ENV.PORT || 3002;

connectDataBase()
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)),
  )
  .catch((err) => console.error("Failed to run server", err));
