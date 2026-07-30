import express from "express";
const router = express.Router();
import User from "../models/User.js";
import sendCodeAndSave from "../controllers/sendCodeAndSave.js";
import signUp from "../controllers/signUp.js";
import login from "../controllers/login.js";
import uploadProfilePicture from "../controllers/uploadProfilePicture.js";
import getProfilePicture from "../controllers/getProfilePicture.js";
import getUserModerations from "../controllers/getUserModerations.js";
import getSavedModerations from "../controllers/getSavedModerations.js";
import saveModeration from "../controllers/saveModeration.js";
import unSaveModeration from "../controllers/unSaveModeration.js";
import googleLogin from "../controllers/googleLogin.js";

router.post("/sendCode", sendCodeAndSave);

router.post("/signUp", signUp);

router.post("/login", login);

router.post("/uploadProfilePicture", uploadProfilePicture);

router.get("/getProfilePicture/:email", getProfilePicture);

router.get("/getUserModerations/:email", getUserModerations);

router.get("/getSavedModerations/:email", getSavedModerations);

router.post("/saveModeration", saveModeration);

router.post("/unSaveModeration", unSaveModeration);

router.post("/googleLogin", googleLogin);

export default router;