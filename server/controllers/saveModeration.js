import User from "../models/User.js";

const saveModeration = async (req, res) => {
    try {
        const { email, moderationId } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.savedModerationsIds.push(moderationId);
        await user.save();
        res.status(200).json({ message: "Moderation saved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default saveModeration;