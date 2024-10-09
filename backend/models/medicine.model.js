import mongoose, { Schema } from "mongoose";
import { ExpiryRecord } from "./expiryrecord.model.js";
import { InventoryLog } from "./inventorylog.model.js";

const medicineSchema = Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      index: true,
      trim: true,
    },
    stockInfo: [
      {
        type: Schema.Types.ObjectId,
        ref: "ExpiryRecord",
      },
    ],
    displayImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Tablet", "Capsule", "Syrup"],
      default: "Tablet",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

medicineSchema.pre("findOneAndDelete", function (next) {
  this.context = this.getOptions().context;
  next();
});

medicineSchema.post("findOneAndDelete", async function (doc) {
  if (doc && this.context?.user) {
    const userId = this.context.user.userId;
    try {
      const stockIds = doc.stockInfo;
      for (let i = 0; i < stockIds.length; i++) {
        const deletedExpiryRecord = await ExpiryRecord.findByIdAndDelete(
          stockIds[i]
        );

        await InventoryLog.create({
          medicineId: deletedExpiryRecord.medicineId,
          updatedBy: userId,
          batchNumber: deletedExpiryRecord.batchNumber,
          expiryDate: deletedExpiryRecord.expiryDate,
          quantity: -1 * deletedExpiryRecord.quantity,
        });
      }
      await ExpiryRecord.deleteMany({
        _id: { $in: doc.stockInfo },
      });
    } catch (error) {
      console.log("Error deleting associated Expiry records:", error);
    }
  }
});

export const Medicine = mongoose.model("Medicine", medicineSchema);
