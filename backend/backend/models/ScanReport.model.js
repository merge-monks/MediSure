import mongoose from "mongoose";

const scanReportSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    scanType: {
      type: String,
      required: true,
      enum: ["X-ray", "MRI scan", "CT scan", "Ultrasound", "PET scan", "Other"],
    },
    originalScanType: {
      type: String,
    },
    predictions: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const ScanReport = mongoose.model("ScanReport", scanReportSchema);

export default ScanReport;
