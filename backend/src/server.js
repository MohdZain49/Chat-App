import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => res.send("MERN Chat Application"));

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
