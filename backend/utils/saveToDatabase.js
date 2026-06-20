import Moderation from "../models/Moderation.js";

const saveToDatabase = async ( req, res ) => {
  try {
    const newModeration = new Moderation({
        url: req.cloudinaryUrl,
        uploader: req.body.uploader,
        nudityScore: req.moderationResult.nudityScore,
        weaponScore: req.moderationResult.weaponScore,
        goreScore: req.moderationResult.goreScore
    });
    await newModeration.save();
    res.status(201).json(newModeration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default saveToDatabase;