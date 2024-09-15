import Joi from "joi";

const userValidationSchema = Joi.object({
  userName: Joi.string()
    .trim()
    .lowercase()
    .min(3)
    .max(30)
    .pattern(/^[a-z0-9._]+$/)
    .required()
    .messages({
      "string.empty": "Username is required.",
      "string.min": "Username must be at least 3 characters long.",
      "string.max": "Username must not exceed 30 characters.",
      "string.pattern.base":
        "Username can only contain lowercase letters, numbers, dots, and underscores.",
      "any.required": "Username is required.",
    }),

  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
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

  fullName: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .pattern(/^[a-zA-Z\s\-'.]+$/)
    .required()
    .messages({
      "string.empty": "Full name is required.",
      "string.min": "Full name must be at least 3 characters long.",
      "string.max": "Full name must not exceed 100 characters.",
      "string.pattern.base":
        "Full name can only contain letters, spaces, hyphens, apostrophes, and dots.",
      "any.required": "Full name is required.",
    }),
});

export default userValidationSchema;
