import { customApiError } from "../utils/customApiError.js";

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new customApiError(400, "Access denied. Admin rights are required");
  }
  next();
};
