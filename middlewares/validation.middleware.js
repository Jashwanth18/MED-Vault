import { asyncHandler } from "../utils/asyncHandler.js";
import { customApiError } from "../utils/customApiError.js";
import loginInputValidationSchema from "../validation/loginInput.validation.js";
import userValidationSchema from "../validation/user.validation.js";

export const validateUser = asyncHandler((req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(",");
    throw new customApiError(400, errorMessage);
  }
  next();
});

export const validateLoginInput = asyncHandler((req, res, next) => {
  const { error } = loginInputValidationSchema.valid(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(",");
    throw new customApiError(400, errorMessage);
  }
  next();
});
