import mongoose from "mongoose";

const moderationSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  uploader: {
    type: String,
    required: true
  },
  nudityScore: {
    type: Number,
    required: true
  },
  weaponScore: {
    type: Number,
    required: true
  },
  goreScore: {
    type: Number,
    required: true
  }
});

const Moderation = mongoose.model("Moderation", moderationSchema);
export default Moderation;