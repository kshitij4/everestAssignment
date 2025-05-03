import { rateLimit } from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: "Your limit exceeded",
});

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  handler: function (req, res) {
    return res.status(429).json({
      error:
        "You’ve made too many requests. Please wait for a moment and try again later.",
    });
  },
});

export { authLimiter, apiRequestLimiter };