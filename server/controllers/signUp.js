import bcrypt from "bcrypt";
import TempCodes from "../models/TempCodes.js";
import User from "../models/User.js";

const signUp = async (req, res, next) => {
  try {
    const { fullName, email, password, code } = req.body;

    // Validate input
    if (!fullName || !email || !password || !code) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.googleId && !existingUser.password) {
        return res.status(409).json({
          message:
            "This email is already registered with Google. Please use Continue with Google.",
        });
      }

      return res.status(409).json({
        message: "User already exists. Please log in.",
      });
    }
    
    // Find verification code
    const tempCode = await TempCodes.findOne({
      email,
      verificationCode: code,
    });

    if (!tempCode) {
      return res.status(400).json({
        message: "Invalid verification code.",
      });
    }

    // Check if the code has expired
    if (tempCode.expiresAt < new Date()) {
      await TempCodes.deleteOne({ email });

      return res.status(400).json({
        message: "Verification code has expired.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      isVerified: true,
    });

    // Remove the used verification code
    await TempCodes.deleteOne({ email });

    res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default signUp;
