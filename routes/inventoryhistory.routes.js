import { Router } from "express";
import { getInventoryLogHistory } from "../controllers/inventoryhistory.controller.js";
import { verifyAccessToken } from "../middlewares/userAuth.middleware.js";
const router = Router();

router.route("/history")
        .get(verifyAccessToken,getInventoryLogHistory);

export default router;