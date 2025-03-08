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
    enum: ["CT scan", "MRI scan"], 
  },
  predictions: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],  // Array of image URLs or paths
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  },
});

const ScanReport = mongoose.models.ScanReport || mongoose.model("ScanReport", scanReportSchema);

export default ScanReport;
