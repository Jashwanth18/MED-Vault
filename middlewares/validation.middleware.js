import { asyncHandler } from "../utils/asyncHandler.js";
import { customApiError } from "../utils/customApiError.js";
import loginInputValidationSchema from "../validation/loginInput.validation.js";
import userValidationSchema from "../validation/user.validation.js";
import medicineValidationSchema from "../validation/medicine.validation.js";

const handleValdiation = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(",");
    throw new customApiError(400, errorMessage);
  }
};

export const validateUser = asyncHandler((req, res, next) => {
  handleValdiation(userValidationSchema, req.body);
  next();
});

export const validateLoginInput = asyncHandler((req, res, next) => {
  handleValdiation(loginInputValidationSchema, req.body);
  next();
});

export const validateMedicine = asyncHandler((req, res, next) => {
  handleValdiation(medicineValidationSchema, req.body);
  next();
});
