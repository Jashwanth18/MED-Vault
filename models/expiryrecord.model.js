import mongoose, { Schema } from "mongoose";

const expiryRecordScehma = Schema(
  {
    medicineId: {
      type: Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    batchNumber: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const ExpiryRecord = mongoose.model("ExpiryRecord", expiryRecordScehma);
