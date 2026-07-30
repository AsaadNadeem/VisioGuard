import express from "express";
import uploadImage from "../controllers/uploadImage.js";
import deleteModeration from "../controllers/deleteModeration.js";
import uploadModeration from "../controllers/uploadModeration.js";
import getModerations from "../controllers/getModerations.js";

const uploadRoutes = express.Router();

uploadRoutes.get("/moderations", getModerations);

uploadRoutes.post("/uploadImage", uploadImage);

uploadRoutes.post("/deleteModeration", deleteModeration);

uploadRoutes.post("/uploadModeration", uploadModeration);

export default uploadRoutes;