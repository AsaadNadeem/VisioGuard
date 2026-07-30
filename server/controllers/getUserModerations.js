import fetchModerationsIds from "../middlewares/fetchModerationsIds.js";
import getModerationsFromIds from "../middlewares/getModerationsFromIds.js";

const getUserModerations = [fetchModerationsIds, getModerationsFromIds];

export default getUserModerations;