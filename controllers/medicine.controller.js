import { Medicine } from "../models/medicine.model.js";
import { ExpiryRecord } from "../models/expiryrecord.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { customApiResponse } from "../utils/customApiResponse.js";
import { uploadFile } from "../utils/cloudinary.js";
import { DEFAULT_IMAGE_URL } from "../src/constants.js";
import { customApiError } from "../utils/customApiError.js";

const createMedicine = asyncHandler(async (req, res) => {
  const { name, description, type } = req.body;
  const newDescription = description || "This is a dummy description";
  console.log(req.file);
  const displayImageLocalPath = req.file?.path;
  let displayImageUrl = "";
  if (!displayImageLocalPath) {
    displayImageUrl = DEFAULT_IMAGE_URL;
  } else {
    displayImageUrl = await uploadFile(displayImageLocalPath);
  }

  const newDisplayImage = displayImageUrl;
  const newMedicine = await Medicine.create({
    name,
    description: newDescription,
    displayImage: newDisplayImage,
    type,
    createdBy: req.user.userId,
  });

  res
    .status(201)
    .json(
      new customApiResponse(201, newMedicine, "Medicine Added succssfully")
    );
});

const getMedicineById = asyncHandler(async (req, res) => {
  const medId = req.params.id;

  const medicine = await Medicine.findById(medId);
  if (!medicine) {
    throw new customApiError(404, "Medicine not found");
  }

  res
    .status(200)
    .json(
      new customApiResponse(200, medicine, "Medicine fetched successfully")
    );
});

const getAllMedicines = asyncHandler(async (req, res) => {
  const { name, type } = req.query;
  let searchQuery = {};
  if (name) {
    searchQuery.name = { $regex: name, $options: "i" };
  }
  if (type) {
    searchQuery.type = type;
  }

  const medicines = await Medicine.find(searchQuery);
  res
    .status(200)
    .json(
      new customApiResponse(200, medicines, "Medicines fetched successfully!")
    );
});

const updateMedicineById = asyncHandler(async (req, res) => {
  const medId = req.params.id;
  const updatedData = req.body;

  const updatedMedicine = Medicine.findByIdAndUpdate(medId, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!updatedMedicine) {
    throw new customApiError(404, "Medicine with this ID doesn't exist");
  }
});

const deleteMedicineById = asyncHandler(async (req, res) => {
  const medId = req.params.id;

  const deletedMedicine = await Medicine.findByIdAndDelete(medId);
  if (!deletedMedicine) {
    res
      .status(404)
      .json(
        new customApiResponse(404, {}, "Medicine with this ID doesn't exist")
      );
  }
  res
    .status(200)
    .json(new customApiResponse(200, {}, "Medicine deleted successfully"));
});

const createExpiryRecord = asyncHandler(async (req, res) => {
  const recordData = req.body;
  const medId = req.params.medId;

  const createdExpiryRecord = await ExpiryRecord.create({
    ...recordData,
    medicineId: medId,
    updatedBy: req.user.userId,
  });

  const expiryRecordId = createdExpiryRecord._id;
  const updatedMedicine = await Medicine.findByIdAndUpdate(
    medId,
    {
      $addToSet: { stockInfo: expiryRecordId },
    },
    { new: true, runValidators: true }
  );
  if (!updatedMedicine) {
    res
      .status(404)
      .json(
        new customApiResponse(404, {}, "Medicine with this ID doesnt exist.")
      );
  }

  res
    .status(200)
    .json(
      new customApiResponse(
        200,
        createdExpiryRecord,
        "Successfully added the expiry record!"
      )
    );
});

const updateExpiryRecordById = asyncHandler(async (req, res) => {
  const recordId = req.params.recordId;
  const updatedData = req.body;

  const updatedExpiryRecord = await ExpiryRecord.findByIdAndUpdate(
    recordId,
    { ...updatedData, updatedBy: req.user.userId },
    { new: true, runValidators: true }
  );

  if (!updateExpiryRecordById) {
    throw new customApiError(404, "Expiry record with this ID doesn't exits");
  }

  res
    .status(200)
    .json(
      new customApiResponse(
        200,
        updatedExpiryRecord,
        "Expiry record updated successfully!"
      )
    );
});

const deleteExpiryRecordById = asyncHandler(async (req, res) => {
  const recordId = req.params.recordId;
  const medId = req.params.medId;

  const medicine = await Medicine.findByIdAndUpdate(
    medId,
    {
      $pull: { stockInfo: recordId },
    },
    { new: true }
  );

  if (!medicine) {
    throw new customApiError(404, "Medicine with this ID doesn't exist");
  }

  const deletedExpiryRecord = await ExpiryRecord.findByIdAndDelete(recordId);
  if (!deletedExpiryRecord) {
    res
      .status(404)
      .json(
        new customApiResponse(
          404,
          {},
          "Expiry Record with this ID doesn't exist"
        )
      );
  }

  res
    .status(200)
    .json(
      new customApiResponse(200, {}, "Expiry record deleted successfully!")
    );
});

export {
  createMedicine,
  getMedicineById,
  getAllMedicines,
  updateMedicineById,
  deleteMedicineById,
  updateExpiryRecordById,
  deleteExpiryRecordById,
  createExpiryRecord,
};
