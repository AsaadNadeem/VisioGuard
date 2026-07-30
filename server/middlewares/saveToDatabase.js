import Moderation from "../models/Moderation.js";
import User from "../models/User.js";

const saveToDatabase = async (req, res) => {
  const email = req.body.email;
  const { name, description, category, publicId } = req.body.moderationData;

  if (!name || !publicId) {
    return res.status(400).json({ error: "name and publicId are required" });
  }

  try {
    const newModeration = new Moderation({
      url: req.imageUrl,
      publicId,
      name,
      description,
      category,
      ...req.moderationResult,
    });
    await newModeration.save();
    try {
      await User.findOneAndUpdate(
        { email: email },
        { $push: { moderationsIds: newModeration._id } },
        { new: true }
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
    res.status(201).json(newModeration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default saveToDatabase;