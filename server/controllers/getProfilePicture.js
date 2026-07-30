import User from "../models/User.js";

const getProfilePicture = async (req, res, next) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    next(err);
  }
};

export default getProfilePicture;