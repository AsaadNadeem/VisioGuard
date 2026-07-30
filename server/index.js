import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import routes
import userRoutes from "./routes/user.js";
import uploadRoutes from "./routes/upload.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");
} catch (err) {
  console.error("❌ MongoDB Connection Failed");
  console.error(err);
  process.exit(1);
}

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api", uploadRoutes);
app.use("/user", userRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "VisioGuard Backend is Running 🚀",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("========== ERROR ==========");
  console.error(err);
  console.error("===========================");

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});