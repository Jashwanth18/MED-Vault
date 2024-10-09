import Joi from "joi";

const loginInputValidationSchema = Joi.object({
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password must not exceed 30 characters.",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    "any.required": "Password is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
});

export default loginInputValidationSchema;
