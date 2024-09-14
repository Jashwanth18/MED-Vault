import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { customApiError } from "../utils/customApiError.js";
import jwt from "jsonwebtoken";

export const verifyAccessToken = asyncHandler(async (req, res, next) => {
  const accessTokenFromCookies = req.cookies?.accessToken;

  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"]; // Handle different cases
  const accessTokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : "";

  const accessToken = accessTokenFromCookies || accessTokenFromHeader;
  if (!accessToken) {
    throw new customApiError(
      401,
      "Invalid Access token! Please login to continue."
    );
  }

  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken?._id;
  if (!userId) {
    throw new customApiError(
      400,
      "You are not authorized to visit this page. Missing userid"
    );
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new customApiError(400, "You are not authorized to visit this page");
  }

  req.user = {
    userId: user._id,
    email: user.email,
    userName: user.userName,
    isAdmin: user.isAdmin,
  };
  next();
});
