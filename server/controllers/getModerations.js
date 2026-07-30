import Moderation from "../models/Moderation.js";

const getModerations = async (req, res) => {
  try {
    const moderations = await Moderation.find();
    res.json(moderations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getModerations;