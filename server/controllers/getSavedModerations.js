import fetchSaved from "../middlewares/fetchSaved.js";
import getModerationsFromIds from "../middlewares/getModerationsFromIds.js";

const getSavedModerations = [fetchSaved, getModerationsFromIds];

export default getSavedModerations;