import { customApiError } from "../utils/customApiError.js";

export const isAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    throw new customApiError(403, "Access denied. Admin rights are required");
  }
  next();
};
