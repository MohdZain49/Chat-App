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

    if (senderId.equals(receiverId)) {
      return res
        .status(400)
        .json({ message: "Cannot send messages to yourself" });
    }

    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Reciever not found." });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: `${ENV.CLOUDINARY_FOLDER_NAME}/messages-images`,
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

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnersId = messages.map((msg) =>
      msg.senderId.toString() === loggedInUserId.toString()
        ? msg.receiverId.toString()
        : msg.senderId.toString(),
    );

    const uniqueChatPartnersId = [...new Set(chatPartnersId)];

    const chatPartners = await User.find({
      _id: { $in: uniqueChatPartnersId },
    }).select("-password");

    return res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in chats controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
