import sightengine from "sightengine";
import dotenv from "dotenv";

dotenv.config();

//Configuration
const client = sightengine(
  process.env.SIGHTENGINE_USER,
  process.env.SIGHTENGINE_SECRET,
);

//Formatting method
const formatModerationResult = (result) => {
  return {
    nudityScore:
      Math.max(
        result.nudity.sexual_activity || 0,
        result.nudity.sexual_display || 0,
        result.nudity.erotica || 0,
        result.nudity.very_suggestive || 0,
        result.nudity.suggestive || 0,
        result.nudity.mildly_suggestive || 0,
      ) * 100,

    weaponScore:
      Math.max(
        result.weapon?.classes?.firearm || 0,
        result.weapon?.classes?.firearm_gesture || 0,
        result.weapon?.classes?.firearm_toy || 0,
        result.weapon?.classes?.knife || 0,
      ) * 100,

    goreScore: (result.gore?.prob || 0) * 100,
  };
};

//Moderation check
const checkImage = async (req, res, next) => {
  try {
    const result = await client
      .check(["nudity-2.1", "weapon", "gore-2.0"])
      .set_url(req.cloudinaryUrl);

    console.log("Moderation Result:", result);

    const formattedResult = formatModerationResult(result);

    req.moderationResult = formattedResult;

    next();
    // return res.status(200).json({
    //   imageUrl: req.cloudinaryUrl,
    //   moderation: formattedResult,
    // });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
};

export { checkImage };
