import User from "../models/User.js";

const uploadProfilePicture = async (req, res, next) => {
  try {
    const { email, profilePicture } = req.body;

    if (!email || !profilePicture) {
      return res.status(400).json({
        message: "Email and profile picture are required.",
      });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { profilePicture },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      message: "Profile picture uploaded successfully.",
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    next(err);
  }
};

export default uploadProfilePicture;