import User from "../models/User.js";

const unSaveModeration = async (req, res) => {
    try {
        const { email, moderationId } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.savedModerationsIds = user.savedModerationsIds.filter(id => id.toString() !== moderationId);
        await user.save();
        res.status(200).json({ message: "Moderation unsaved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default unSaveModeration;