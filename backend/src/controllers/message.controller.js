import User from "../models/user.model.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password",
    );

    if (!filteredUsers) {
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
