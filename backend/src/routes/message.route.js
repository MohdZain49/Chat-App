import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChatPartners,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.use(protectRoute);

messageRouter.get("/contacts", getAllContacts);

messageRouter.get("/chats", getChatPartners);

messageRouter.get("/:id", getMessagesByUserId);

messageRouter.post("/send/:id", sendMessage);

export default messageRouter;
