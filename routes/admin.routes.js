import { Router } from "express";
import {
  loginController,
  registerController,
  logoutController,
} from "../controllers/user.controller.js";
import { verifyAccessToken } from "../middlewares/userAuth.middleware.js";
const router = Router();

router.route("/register").post( registerController);

router.route("/login").post(loginController);

router.route("/logout").post(verifyAccessToken, logoutController);
