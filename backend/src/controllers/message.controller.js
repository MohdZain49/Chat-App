import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    if (filteredUsers.length === 0) {
      return res.status(404).json({
        message: "Contacts not found",
      });
    }

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in 'get all contact' controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: id },
        { senderId: id, receiverId: myId },
      ],
    });

    if (messages.length === 0) {
      return res.status(404).json({
        message: "messages not found",
      });
    }

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in 'get all contact' controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    const { text, image } = req.body;
    if (!text?.trim() && !image) {
      return res.status(400).json({
        message: "Message content required",
      });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "chat-app/messages-images",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // todo: send message in real-time if user is online - socket.io

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in send message controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
  