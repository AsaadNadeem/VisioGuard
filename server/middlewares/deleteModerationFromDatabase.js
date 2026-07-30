import Moderation from "../models/Moderation.js";
import User from "../models/User.js";

const deleteModerationFromDatabase = async (req, res, next) => {
  try {
    const { publicId, email } = req.body;

    const moderation = await Moderation.findOne({ publicId });

    if (!moderation) {
      return res.status(404).json({
        message: "Moderation not found.",
      });
    }

    await moderation.deleteOne();

    await User.findOneAndUpdate(
      { email },
      {
        $pull: {
          moderationsIds: moderation._id,
        },
      }
    );

    res.status(200).json({
      message: "Moderation deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteModerationFromDatabase;