import transporter from "../utils/mail.js";
import User from "../models/User.js";

const sendCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      if (user.googleId && !user.password) {
        return res.status(409).json({
          message:
            "This email is already registered with Google. Please use Continue with Google.",
        });
      }

      return res.status(409).json({
        message: "User already exists. Please log in.",
      });
    }

    // Generate a random 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Make the data available to the next middleware
    req.verification = {
      email,
      code,
    };

    // Send email
    await transporter.sendMail({
      from: `"VisioGuard" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "VisioGuard Verification Code",
      text: `Your one-time verification code is: ${code}. Please use this code to verify your email address. Don't share this code with anyone. This code will expire in 5 minutes.`,
      html: `
        <p>Hello,</p>

        <p>Your one-time verification code is:</p>

        <div style="
          display:inline-block;
          padding:12px 24px;
          margin:10px 0;
          font-size:32px;
          font-weight:bold;
          letter-spacing:8px;
          color:#2563eb;
          background:#f3f4f6;
          border:2px dashed #2563eb;
          border-radius:8px;
          font-family:Arial,sans-serif;
        ">
          ${code}
        </div>

        <p>
          Please use this code to verify your email address.
        </p>

        <p>
          <strong>Do not share this code with anyone.</strong><br>
          This code will expire in <strong>5 minutes</strong>.
        </p>

        <p>Regards,<br><strong>VisioGuard Team</strong></p>
      `,
    });

    // Continue to next middleware
    next();
  } catch (err) {
    next(err);
  }
};

export default sendCode;
