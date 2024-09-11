import { customApiError } from "../utils/customApiError.js";

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new customApiError(400, "You are not authorized to view this page");
  }
  next();
};
