import checkImage from "../middlewares/sightengine.js";
import saveToDatabase from "../middlewares/saveToDatabase.js";

const uploadModeration = [checkImage, saveToDatabase];

export default uploadModeration;