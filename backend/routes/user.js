import express from "express";
const router = express.Router();
import User from "../models/User.js";

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { fullName, username, password } = req.body;
  const newUser = new User({
    fullName,
    username,
    password
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Username already exists" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;