import { validationResult } from "express-validator";
import ApiError from "../utils/apiError.js";

const validate = (validations) => {
  return async (req, res, next) => {
    console.log();
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        new ApiError(
          400,
          errors
            .array()
            .map((e) => e.msg)
            .join(", "),
          true
        )
      );
    }
    next();
  };
};

export default validate;
