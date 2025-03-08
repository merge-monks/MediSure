import ScanReport from "../models/ScanReport.model.js";

// Controller for handling scan report operations
export const createScanReport = async (req, res) => {
  try {
    const { patientName, scanType, predictions } = req.body;
    
    // Basic validation
    if (!patientName || !scanType) {
      return res.status(400).json({ 
        success: false,
        message: "Patient name and scan type are required" 
      });
    }
    
    // Create a new scan report
    const newScanReport = new ScanReport({
      patientName,
      scanType,
      predictions: predictions || [],
      // If user authentication is implemented, include user ID
      // userId: req.user?._id
    });
    
    // Save to database
    await newScanReport.save();
    
    res.status(201).json({ 
      success: true,
      message: "Scan report saved successfully", 
      reportId: newScanReport._id,
      report: newScanReport
    });
  } catch (error) {
    console.error("Error saving scan report:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to save scan report",
      error: error.message 
    });
  }
};

// Get all scan reports
export const getAllScanReports = async (req, res) => {
  try {
    // Get all reports, sorted by newest first
    const reports = await ScanReport.find()
      .sort({ timestamp: -1 });
    
    res.status(200).json({
      success: true,
      count: reports.length,
      reports
    });
  } catch (error) {
    console.error("Error fetching scan reports:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch scan reports",
      error: error.message 
    });
  }
};

// Get a specific scan report by ID
export const getScanReportById = async (req, res) => {
  try {
    const reportId = req.params.id;
    
    const report = await ScanReport.findById(reportId);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Scan report not found"
      });
    }
    
    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    console.error("Error fetching scan report:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch scan report",
      error: error.message 
    });
  }
};
