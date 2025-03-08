import mongoose from "mongoose";

const scanReportSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true,
  },
  scanType: {
    type: String,
    required: true,
    enum: ["CT scan", "MRI scan"], // Limit to valid scan types
  },
  predictions: {
    type: [String],
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model if you have one
  },
});

const ScanReport = mongoose.models.ScanReport || mongoose.model("ScanReport", scanReportSchema);

export default ScanReport;
