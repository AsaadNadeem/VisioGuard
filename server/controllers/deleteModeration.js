import deleteImageFromCloudinary from "../middlewares/deleteImageFromCloudinary.js";
import deleteModerationFromDatabase from "../middlewares/deleteModerationFromDatabase.js";

const deleteModeration = [deleteImageFromCloudinary, deleteModerationFromDatabase];

export default deleteModeration;