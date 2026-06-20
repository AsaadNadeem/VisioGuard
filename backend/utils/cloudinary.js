import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image
const uploadImage = async (req, res, next) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    console.log("Upload Result:", uploadResult);

    req.cloudinaryUrl = uploadResult.secure_url;

    next();
  } catch (error) {
    next(error);
  }
};

// Delete an image
// const deleteImage = async (publicId) => {
//  const deleteResult = await cloudinary.uploader
//    .destroy(publicId, { resource_type: 'image' })
//    return deleteResult
//    .catch((error) => {
//        console.log(error);
//    });
//    console.log(deleteResult);
// };

export { uploadImage };
