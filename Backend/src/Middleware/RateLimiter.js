import ratelimit from "../Config/Upstash.js";
const RateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit(req);
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export default RateLimiter;
