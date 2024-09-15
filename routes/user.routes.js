import { Router } from "express";
import {
  loginController,
  registerController,
  logoutController,
  updatePasswordController,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { verifyAccessToken } from "../middlewares/userAuth.middleware.js";
import { validateLoginInput, validateUser } from "../middlewares/validation.middleware.js";
const router = Router();

router
    .route("/register")
    .post(validateUser, registerController);

router
    .route("/login")
    .post(validateLoginInput, loginController);

// AUTH ROUTES

router
    .route("/update-password")
    .post(verifyAccessToken, updatePasswordController);

router
    .route("/logout")
    .post(verifyAccessToken, logoutController);

router
    .route("/update-access-token")
    .post(refreshAccessToken);    

export default router;
