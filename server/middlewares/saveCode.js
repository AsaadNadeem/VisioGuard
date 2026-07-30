import TempCode from "../models/TempCodes.js";

const saveCode = async (req, res, next) => {
  try {
    const { email, code } = req.verification;

    await TempCode.findOneAndUpdate(
      { email },
      {
        verificationCode: code,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(200).json({
      message: "Verification code sent successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export default saveCode;