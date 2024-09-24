import { InventoryLog } from "../models/inventorylog.model.js";
import { Medicine } from "../models/medicine.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { customApiResponse } from "../utils/customApiResponse.js";
import { monthMap } from "../src/constants.js";
const getInventoryLogHistory = asyncHandler(async (req, res) => {
  let searchQuery = {};
  const { year, month, search } = req.query;
  if (month && !year && monthMap[month] !== undefined) {
    const monthIndex = monthMap[month];
    const currentYear = new Date().getFullYear();
    const startOfMonth = new Date(currentYear, monthIndex, 1);
    const endOfMonth = new Date(currentYear, monthIndex + 1, 1);
    searchQuery.createdAt = { $gte: startOfMonth, $lt: endOfMonth };
  }

  if (year && !month) {
    searchQuery.createdAt = {
      $gte: new Date(year, 0, 1),
      $lt: new Date(year, 12, 1),
    };
  }

  if (month && monthMap[month] !== undefined && year) {
    const monthIndex = monthMap[month];
    const startOfMonth = new Date(year, monthIndex, 1);
    const endOfMonth = new Date(year, monthIndex + 1, 1);

    searchQuery.createdAt = { $gte: startOfMonth, $lt: endOfMonth };
  }

  if (search) {
    searchQuery.medicineId = await Medicine.find({
      name: { $regex: search, $options: "i" },
    });
    searchQuery.medicineId = {
      $in: searchQuery.medicineId.map((med) => med._id),
    };
  }
  console.log(searchQuery);
  const inventoryHistory = await InventoryLog.find(searchQuery).populate([
    {
      path: "medicineId",
      select: "name -_id",
    },
    {
      path: "updatedBy",
      select: "userName -_id",
    },
  ]);

  res
    .status(200)
    .json(
      new customApiResponse(
        200,
        inventoryHistory,
        "Inventory log history fetched successfully!"
      )
    );
});

export { getInventoryLogHistory };
