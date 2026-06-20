import express from "express";
import sightengine from "sightengine";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

//Importing routes
import userRoutes from "./routes/user.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

//Connect to MongoDB
const uri = process.env.MONGO_URI;
await mongoose.connect(uri);
console.log("Connected to MongoDB");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

//Routes
app.use("/api", uploadRoutes);
app.use("/users", userRoutes);

const client = sightengine(
  process.env.SIGHTENGINE_USER,
  process.env.SIGHTENGINE_SECRET,
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
