import Moderation from "../models/Moderation.js";

const getModerationsFromIds = async (req, res) => {
  try {
    const moderations = await Moderation.find({ _id: { $in: req.moderationsIds } });
    res.json(moderations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getModerationsFromIds;