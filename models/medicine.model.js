import mongoose, { Schema } from "mongoose";

const expiryRecordScehma = Schema(
  {
    medicineId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    updatedOn: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const ExpiryRecord = mongoose.model("ExpiryRecord", expiryRecordScehma);

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
      //TODO: ADD default dp url
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

medicineSchema.post("findByIdAndDelete", async function (medicine) {
  if (medicine) {
    try {
      await ExpiryRecord.deleteMany({
        _id: { $in: medicine.stockInfo },
      });
    } catch (error) {
      console.log("Error deleting associated Expiry records:", error);
    }
  }
});

export const Medicine = mongoose.model("Medicine", medicineSchema);
