import ScanReport from "../models/ScanReport.model.js";

// Controller for handling scan report operations
export const createScanReport = async (req, res) => {
  try {
    const { patientName, scanType, predictions, images } = req.body;
    
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
      images: images || [], // Store image filenames
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
    const reports = await ScanReport.find()
      .sort({ timestamp: -1 });
    
    // Transform data to match frontend expectations with focus on key information
    const formattedReports = reports.map(report => {
      // Generate colors based on scan type
      const colorMap = {
        "CT scan": "from-cyan-500 to-blue-500",
        "MRI scan": "from-purple-500 to-indigo-500",
        // Default fallback color
        "default": "from-rose-400 to-red-500"
      };
      
      const color = colorMap[report.scanType] || colorMap.default;
      
      // Format date
      const date = new Date(report.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      
      // Get primary finding (tumor type) from predictions
      const tumorType = report.predictions && report.predictions.length > 0 
        ? report.predictions[0]
        : "No findings";
      
      return {
        id: report._id,
        name: report.scanType,
        color: color,
        description: tumorType,
        date: date,
        status: "Completed",
        patient: report.patientName,
        doctor: "Dr. Assigned"
      };
    });
    
    res.status(200).json({
      success: true,
      count: reports.length,
      reports: formattedReports
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

// Get images for a specific scan report
export const getScanReportImages = async (req, res) => {
  try {
    const reportId = req.params.id;
    
    const report = await ScanReport.findById(reportId);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Scan report not found"
      });
    }
    
    // Format image paths to be the full URL to the Python backend
    const imagePaths = report.images.map(filename => 
      `http://127.0.0.1:5000/uploads/${filename}`
    );
    
    // Return the images array from the report
    res.status(200).json({
      success: true,
      images: imagePaths,
      reportDetails: {
        id: report._id,
        patientName: report.patientName,
        scanType: report.scanType,
        predictions: report.predictions,
        date: report.timestamp
      }
    });
  } catch (error) {
    console.error("Error fetching scan report images:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch scan report images",
      error: error.message 
    });
  }
};
