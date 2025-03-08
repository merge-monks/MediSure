import mongoose from "mongoose";

//Schema
const dosageSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Dosage = mongoose.model("Dosage", dosageSchema);

export default Dosage;
