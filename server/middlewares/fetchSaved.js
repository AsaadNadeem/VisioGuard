import User from "../models/User.js";

const fetchSaved = async (req, res, next) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.moderationsIds = user.savedModerationsIds;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default fetchSaved;