import Joi from "joi";

const userValidationSchema = Joi.object({
  userName: Joi.string().trim().lowercase().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().trim().min(3).max(100).required(),
});

export default userValidationSchema;
