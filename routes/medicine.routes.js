import { Router } from "express";
import { validateMedicine } from "../middlewares/validation.middleware.js";
import { createMedicine, getMedicineById, getAllMedicines, deleteMedicineById, updateMedicineById, deleteExpiryRecordById, createExpiryRecord, updateExpiryRecordById, getStockInfo } from "../controllers/medicine.controller.js";
import { isAdmin } from "../middlewares/adminAuth.middleware.js";
import { verifyAccessToken } from "../middlewares/userAuth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
    .route("/")
    .get(verifyAccessToken, getAllMedicines);

router
    .route("/new-med")
    .post( verifyAccessToken, isAdmin, upload.single("displayImage"), validateMedicine, createMedicine);

router
    .route("/:id")
    .get(verifyAccessToken, getMedicineById)
    .put(verifyAccessToken, isAdmin, updateMedicineById)
    .delete(verifyAccessToken, isAdmin, deleteMedicineById);

router
    .route("/:medId/stockInfo")
    .get(verifyAccessToken, getStockInfo)

router
    .route("/:medId/new-record")
    .post(verifyAccessToken, isAdmin, createExpiryRecord)


router
    .route("/:medId/:recordId")
    .put(verifyAccessToken, isAdmin, updateExpiryRecordById)
    .delete(verifyAccessToken, isAdmin, deleteExpiryRecordById)



export default router;

