import { Medicine } from "../models/medicine.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { customApiResponse } from "../utils/customApiResponse.js";

const createMedicine = asyncHandler(async (req, res) => {
  const { name, description, displayImage, type } = req.body;
  const newDescription = description || "This is a dummy description";
  const newDisplayImage = displayImage || "This is a dummy image";

  const newMedicine = await Medicine.create({
    name,
    description: newDescription,
    displayImage: newDisplayImage,
    type,
    createdBy: req.user.userId,
  });

  res.status(201).json(
    new customApiResponse(
      201,
      {
        name: newMedicine.name,
        description: newMedicine.description,
        displayImage: newMedicine.displayImage,
        type: newMedicine.type,
        createdBy: newMedicine.createdBy,
      },
      "Medicine Added succssfully"
    )
  );
});

export { createMedicine };
