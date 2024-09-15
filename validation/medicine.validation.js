import Joi from "joi";

const medicineValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Medicine name is required",
    "any.required": "Medicine name is required",
  }),
  displayImage: Joi.string().uri().optional().messages({
    "string.uri": "Display image must be a valid URL",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
  }),
  type: Joi.string()
    .valid("Tablet", "Capsule", "Syrup")
    .default("Tablet")
    .messages({
      "any.only": "Type must be one of Tablet, Capsule, or Syrup",
    }),
});

module.exports = { medicineValidationSchema };
