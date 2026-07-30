import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    default: null,
  },

  googleId: {
    type: String,
    default: null,
  },

  profilePicture: {
    type: String,
    default: null,
  },

  savedModerationsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Moderation",
    },
  ],

  moderationsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Moderation",
    },
  ],
});

const User = mongoose.model("Users", userSchema);

export default User;