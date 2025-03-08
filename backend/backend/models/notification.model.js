import mongoose from "mongoose";

//Schema
const medicalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    medicationId: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
    dosage: {
      type: Array,
      required: true,
    },
    recurrence: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Date,
      required: true,
    },
    takenHistory: {
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
