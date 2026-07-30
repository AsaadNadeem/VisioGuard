import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImageFromCloudinary = async (req, res, next) => {
  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({ message: "publicId is required" });
  }

  try {
    const deleteResult = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (deleteResult.result !== "ok") {
      return res.status(400).json({ message: "Failed to delete image" });
    }

    next();
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteImageFromCloudinary;