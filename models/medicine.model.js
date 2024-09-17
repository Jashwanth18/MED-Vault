import mongoose, { Schema } from "mongoose";
import { ExpiryRecord } from "./expiryrecord.model.js";

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

medicineSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      await ExpiryRecord.deleteMany({
        _id: { $in: doc.stockInfo },
      });
    } catch (error) {
      console.log("Error deleting associated Expiry records:", error);
    }
  }
});

export const Medicine = mongoose.model("Medicine", medicineSchema);
