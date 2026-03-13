import express from "express";
import dotenv from "dotenv";
import connectDataBase from "./lib/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => res.send("MERN Chat Application"));

const PORT = process.env.PORT || 3002;

connectDataBase()
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)),
  )
  .catch((err) => console.error("Failed to run server", err));
