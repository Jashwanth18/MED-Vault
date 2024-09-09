import mongoose, { Schema } from "mongoose";

const expiryRecordScehma = Schema(
  {
    quantity: {
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

const ExpiryRecord = mongoose.model("ExpiryRecord", expiryRecordScehma);

const medicineSchema = Schema(
  {
    name: {
      type: String,
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
  },
  { timestamps: true }
);

export const Medicine = mongoose.model("Medicine", medicineSchema);
