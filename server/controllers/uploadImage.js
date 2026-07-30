import uploadLocally from "../middlewares/uploadLocally.js";
import uploadOnCloudinary from "../middlewares/uploadOnCloudinary.js";

const respondWithUpload = (req, res) => {
  res.status(200).json({
    url: req.cloudinaryUrl,
    publicId: req.cloudinaryPublicId,
  });
};

const uploadImage = [uploadLocally.single("image"), uploadOnCloudinary, respondWithUpload];

export default uploadImage;