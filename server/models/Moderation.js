import mongoose from "mongoose";

const moderationSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: null },
  category: { type: String, default: null },
  nudityScore: { type: Number, required: true },
  weaponScore: { type: Number, required: true },
  goreScore: { type: Number, required: true },
});

const Moderation = mongoose.model("Moderation", moderationSchema);
export default Moderation;