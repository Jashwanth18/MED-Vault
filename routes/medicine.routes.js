import { Router } from "express";
import { validateMedicine } from "../middlewares/validation.middleware.js";
import { createMedicine } from "../controllers/medicine.controller.js";
import { isAdmin } from "../middlewares/adminAuth.middleware.js";
import { verifyAccessToken } from "../middlewares/userAuth.middleware.js";

const router = Router();

// router
//     .route("/")
//     .get(isAdmin, getMedicines);

router
    .route("/new-med")
    .post(verifyAccessToken,isAdmin, validateMedicine, createMedicine);

// router
//     .route("/:id")
//     .patch(isAdmin, updateMedicine)
//     .delete(isAdmin, deleteMedicine);




export default router;

