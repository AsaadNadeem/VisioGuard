import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    req.cloudinaryUrl = uploadResult.secure_url;
    req.cloudinaryPublicId = uploadResult.public_id;

    next();
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return res.status(500).json({ error: "Failed to upload image" });
  } 
  finally {
    // clean up the local temp file regardless of outcome
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete local temp file:", err);
    });
  }
};

export default uploadOnCloudinary;