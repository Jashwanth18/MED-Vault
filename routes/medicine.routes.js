import { Router } from "express";
import { validateMedicine } from "../middlewares/validation.middleware.js";
import { createMedicine, getMedicineById, getAllMedicines, deleteMedicineById, updateMedicineById } from "../controllers/medicine.controller.js";
import { isAdmin } from "../middlewares/adminAuth.middleware.js";
import { verifyAccessToken } from "../middlewares/userAuth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
    .route("/")
    .get(verifyAccessToken, getAllMedicines);

router
    .route("/new-med")
    .post( upload.single("displayImage"), verifyAccessToken, isAdmin, validateMedicine, createMedicine);

router
     .route("/:id")
     .get(verifyAccessToken, getMedicineById)
     .put(verifyAccessToken, isAdmin, updateMedicineById)
     .delete(verifyAccessToken, isAdmin, deleteMedicineById);




export default router;

