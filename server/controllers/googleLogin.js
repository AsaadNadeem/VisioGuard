import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required.",
      });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub,
      email,
      name,
      picture,
      email_verified,
    } = payload;

    if (!email_verified) {
      return res.status(401).json({
        message: "Google email is not verified.",
      });
    }

    // Find existing user
    let user = await User.findOne({ email });

    if (user) {
      // Existing user

      if (!user.googleId) {
        user.googleId = sub;
      }

      if (!user.profilePicture) {
        user.profilePicture = picture;
      }

      await user.save();
    } else {
      // New Google user

      user = await User.create({
        fullName: name,
        email,
        password: null,
        googleId: sub,
        profilePicture: picture,
      });
    }

    res.status(200).json({
      message: "Google login successful.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default googleLogin;