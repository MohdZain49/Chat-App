import express from "express"
import protectRoute from "../middlewares/auth.middleware.js";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";

const messageRouter = express.Router()

messageRouter.get("/contacts", protectRoute, getAllContacts);

messageRouter.get("/:id", protectRoute, getMessagesByUserId);

messageRouter.post("/send/:id", protectRoute, sendMessage)

export default messageRouter;