import mongoose from "mongoose";

//Schema
const medicalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    medicineName: {
      type: String,
      required: true,
    },
    dosageQuantity: {
      type: String,
      required: true,
    },
    dosageUnit: {
      type: String,
      required: true,
    },
    frequency: {
      type: Array,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    currentQuantity: {
      type: String,
      required: true,
    },
    dosageHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dosage",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Medical = mongoose.model("Medical", medicalSchema);

export default Medical;
