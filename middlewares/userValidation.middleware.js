import { asyncHandler } from "../utils/asyncHandler.js";
import { customApiError } from "../utils/customApiError.js";
import userValidationSchema from "../validation/user.validation.js";

export const validateUser = asyncHandler((req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(",");
    throw new customApiError(400, errorMessage);
  }
  next();
});
