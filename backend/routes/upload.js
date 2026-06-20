import express from "express";
import { uploadImage } from "../utils/cloudinary.js";
import saveToDatabase from "../utils/saveToDatabase.js";
import upload from "../middleware/upload.middleware.js";
import Moderation from "../models/Moderation.js";

import { checkImage } from "../utils/sightengine.js";

const uploadRoutes = express.Router();

uploadRoutes.post(
  "/upload",
  upload.single("image"),
  uploadImage,
  checkImage,
  saveToDatabase
);

uploadRoutes.get("/moderations", async (req, res) => {
  try {
    const moderations = await Moderation.find();
    res.json(moderations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default uploadRoutes;