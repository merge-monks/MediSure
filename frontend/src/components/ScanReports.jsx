import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Upload,
  FileText,
  Image,
  AlertCircle,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Add a function to check API server status at component load
const checkApiServer = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch("http://localhost:4000/api/health", {
      method: "GET",
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.warn("API server check failed:", error.message);
    return false;
  }
};

const ScanReports = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'uploading', 'success', 'error'
  const fileInputRef = useRef(null);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [analysisError, setAnalysisError] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [patientName, setPatientName] = useState("");
  const [scanType, setScanType] = useState("Brain Tumor Scan");
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [predictions, setPredictions] = useState([]);
  // Add state for custom alert modal
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [serverStatus, setServerStatus] = useState(null); // null = unknown, true = online, false = offline

  // Check API server status on component mount
  useEffect(() => {
    const checkServer = async () => {
      const isOnline = await checkApiServer();
      setServerStatus(isOnline);
      if (!isOnline) {
        console.warn("API server appears to be offline. Some features may not work correctly.");
      }
    };
    
    checkServer();
  }, []);

  const navigateToDash = () => {
    navigate('/Dashboard');
  }
  
  const handleCancel = () => {
    // Clear selected files and reset states
    setSelectedFiles([]);
    setUploadStatus(null);
    setAnalysisResults([]);
    setAnalysisError(null);
    setPatientName("");
    setScanType("Brain Tumor Scan");
    setAnalysisCompleted(false);
    setPredictions([]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setUploadStatus(null);
      setAnalysisResults([]);
      setAnalysisError(null);
      setAnalysisCompleted(false);
      setPredictions([]);
      
      // Automatically start processing images when files are selected
      handleUpload(files);
    }
  };

  // Update the setScanType to include console log
  const handleScanTypeChange = (e) => {
    const newScanType = e.target.value;
    setScanType(newScanType);
    const endpoint = newScanType === "Bone Tissue Scan" 
      ? "http://127.0.0.1:5000/predict_bone_route"
      : "http://127.0.0.1:5000/predict";
    console.log(`Scan type changed to: ${newScanType}`);
    console.log(`Endpoint will be: ${endpoint}`);
  };

  const handleUpload = async (filesToProcess = selectedFiles) => {
    if (filesToProcess.length === 0) {
      setUploadStatus('error');
      setAnalysisError('Please select files to upload.');
      return;
    }

    if (!patientName.trim()) {
      setUploadStatus('error');
      setAnalysisError('Please enter patient name.');
      return;
    }

    setUploadStatus("uploading");
    setAnalysisResults([]);
    setAnalysisError(null);
    setProgress({ current: 0, total: filesToProcess.length });
    setAnalysisCompleted(false);
    
    const results = [];
    const extractedPredictions = [];
    
    // Determine which endpoint to use based on scan type
    const endpoint = scanType === "Bone Tissue Scan" 
      ? "http://127.0.0.1:5000/predict_bone_route"
      : "http://127.0.0.1:5000/predict";
    
    console.log(`Processing ${filesToProcess.length} files with scan type: ${scanType}`);
    console.log(`Using endpoint: ${endpoint}`);
    
    // Process images sequentially
    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      setProgress({ current: i + 1, total: filesToProcess.length });
      
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("patientName", patientName);
        formData.append("scanType", scanType);

        // Update UI to show which file is currently being processed
        setAnalysisResults([...results, {
          fileName: file.name,
          processing: true,
        }]);

        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          mode: 'cors',
          headers: {
            'Accept': 'application/json, image/png',
          },
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        // Get the prediction from X-Prediction header
        let prediction = response.headers.get('X-Prediction') || "Unknown";
        console.log(`Received prediction from header: ${prediction}`);
        
        // Get the image blob and create URL
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        
        const resultItem = {
          fileName: file.name,
          resultImage: imageUrl,
          prediction: prediction
        };
        
        results.push(resultItem);
        extractedPredictions.push(prediction);
        
        // Update UI after each file completes
        setAnalysisResults([...results]);
        
      } catch (error) {
        console.error(`Error analyzing image ${file.name}:`, error);
        const errorResult = {
          fileName: file.name,
          error: error.message,
          isError: true
        };
        results.push(errorResult);
        
        // Update UI after each file errors
        setAnalysisResults([...results]);
      }
    }
    
    // Final update with all results
    setAnalysisResults(results);
    setPredictions(extractedPredictions);
    
    // Check if any results had errors
    const hasErrors = results.some(result => result.isError);
    if (hasErrors) {
      setUploadStatus('partial');
      setAnalysisError('Some files could not be analyzed. Check the results below.');
    } else {
      setUploadStatus('success');
      setAnalysisCompleted(true);
    }
  };

  const handleSubmit = async () => {
    // Extract predictions from results
    const tumorTypes = analysisResults
      .filter(result => !result.isError)
      .map(result => result.prediction || "No tumor");
    
    // Add additional logging to verify predictions
    console.log("Tumor predictions being saved:", tumorTypes);
    
    const reportData = {
      patientName,
      scanType,
      predictions: tumorTypes,
      images: selectedFiles.map(file => file.name) 
    };
    
    console.log("Submitting report with data:", reportData);
    
    // Set uploading state
    setUploadStatus("uploading");
    
    try {
      // First check if the server is reachable
      const serverCheck = await fetch("http://localhost:4000/api/health", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        // Add a timeout
        signal: AbortSignal.timeout(5000)
      }).catch(err => {
        console.warn("Health check failed, proceeding with submission anyway:", err);
        return { ok: false };
      });
      
      // If server health check fails, log but continue with submission attempt
      if (!serverCheck.ok) {
        console.warn("Server health check failed, attempting submission anyway");
      }
      
      const response = await fetch("http://localhost:4000/api/medical/scanReports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(reportData),
        credentials: 'include'
      });
      
      // Log response status for debugging
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { message: errorText || "Unknown server error" };
        }
        throw new Error(errorData.message || "Failed to save report");
      }
      
      // Try parsing JSON but handle cases where response isn't JSON
      let data;
      const responseText = await response.text();
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.warn("Response is not valid JSON:", responseText);
        data = { message: "Report saved but server returned invalid response" };
      }
      
      // Log success and show alert with more detailed message
      console.log("Report saved successfully:", data);
      setUploadStatus("success");
      setAlertMessage(`Medical scan data for ${patientName} has been successfully stored in the database! ${data.reportId ? `Report ID: ${data.reportId}` : ""}`);
      setShowAlert(true);
    } catch (error) {
      console.error("Error saving report:", error);
      setUploadStatus("error");
      setAnalysisError(error.message || "Failed to submit report to database");
      setAlertMessage(`Error: ${error.message || "Failed to save data"}. Please try again.`);
      setShowAlert(true);
    }
  };

  // Function to extract prediction from image title
  const extractPredictionFromImage = async (imageUrl) => {
    // For implementation simplicity, we'll return Unknown
    // The real prediction will be extracted when the image loads in the UI
    return "Unknown";
  };

  // Add function to clear the form after submission
  const clearForm = () => {
    setSelectedFiles([]);
    setUploadStatus(null);
    setAnalysisResults([]);
    setAnalysisError(null);
    setPatientName("");
    setScanType("Brain Tumor scan");
    setAnalysisCompleted(false);
    setPredictions([]);
    setShowAlert(false);
  };

  const openFileExplorer = () => {
    fileInputRef.current.click();
  };

  // Display the appropriate button based on analysis status
  const renderActionButton = () => {
    if (analysisCompleted) {
      return (
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          Submit
        </button>
      );
    } else {
      return (
        <button
          onClick={handleUpload}
          disabled={uploadStatus === "uploading" || selectedFiles.length === 0}
          className={`px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all cursor-pointer
            ${
              uploadStatus === "uploading" || selectedFiles.length === 0
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
        >
          {uploadStatus === "uploading" ? "Analyzing..." : "Analyze Scans"}
        </button>
      );
    }
  };



  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button 
            onClick={navigateToDash}
            className="p-2 mr-4 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-slate-600 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">
            Scan Medical Reports
          </h1>
        </div>

        {/* Main content area */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-700 mb-2">
              Upload Medical Scan Images
            </h2>
            <p className="text-slate-500">
              Upload your medical scan images for AI analysis
            </p>
          </div>

          {/* Patient Information Form */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="patientName" className="text-sm font-medium text-slate-700 mb-1" required='true'>
                Patient's Name
              </label>
              <input
                id="patientName"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient's full name"
                className="border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="scanType" className="text-sm font-medium text-slate-700 mb-1">
                Scan Type
              </label>
              <select
                id="scanType"
                value={scanType}
                onChange={handleScanTypeChange} // Changed from setScanType to our new handler
                className="border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
              >
                <option value="Brain Tumor Scan">Brain Tumor Scans</option>
                <option value="Bone Tissue Scan">Bone Tissue Scans</option>
              </select>
            </div>
          </div>

          {/* File upload area */}
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center
              ${
                selectedFiles.length > 0
                  ? "border-cyan-300 bg-cyan-50"
                  : "border-slate-300 hover:border-cyan-400"
              }
              transition-all cursor-pointer`}
            onClick={openFileExplorer}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
            />
            <div className="flex flex-col items-center">
              {selectedFiles.length === 0 ? (
                <>
                  <div className="h-16 w-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                    <Upload size={32} className="text-cyan-600" />
                  </div>
                  <h3 className="font-medium text-lg text-slate-700 mb-2">
                    Click to upload or drag and drop
                  </h3>
                  <p className="text-slate-500 text-sm mb-2">
                    Supported formats: JPEG, PNG, DICOM, TIFF
                  </p>
                  <p className="text-xs text-slate-400">
                    Maximum file size: 50MB
                  </p>
                </>
              ) : (
                <>
                  <div className="h-16 w-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                    <FileText size={32} className="text-cyan-600" />
                  </div>
                  <h3 className="font-medium text-lg text-slate-700 mb-1">
                    {selectedFiles.length}{" "}
                    {selectedFiles.length === 1 ? "file" : "files"} selected
                  </h3>
                  <p className="text-sm text-cyan-600 mb-2">
                    Click to change selection
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="bg-white p-2 rounded-lg shadow-sm flex items-center"
                      >
                        <Image size={16} className="text-cyan-500 mr-2" />
                        <span className="text-sm text-slate-600 truncate max-w-[150px]">
                          {file.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Status message */}
          {uploadStatus && (
            <div className={`mt-4 p-3 rounded-lg flex items-center
              ${uploadStatus === 'uploading' ? 'bg-blue-50 text-blue-700' : 
                uploadStatus === 'success' ? 'bg-green-50 text-green-700' : 
                uploadStatus === 'partial' ? 'bg-yellow-50 text-yellow-700' :
                'bg-red-50 text-red-700'}`}
            >
              {uploadStatus === 'uploading' && <div className="animate-spin h-5 w-5 border-2 border-blue-700 border-t-transparent rounded-full mr-2"></div>}
              {uploadStatus === 'success' && <Check size={18} className="mr-2" />}
              {uploadStatus === 'partial' && <AlertCircle size={18} className="mr-2" />}
              {uploadStatus === 'error' && <AlertCircle size={18} className="mr-2" />}
              <span className="text-sm font-medium">
                {uploadStatus === 'uploading' && `Analyzing images... (${progress.current}/${progress.total})`}
                {uploadStatus === 'success' && 'Analysis completed successfully!'}
                {uploadStatus === 'partial' && analysisError}
                {uploadStatus === 'error' && analysisError ? `Error: ${analysisError}` : 'Please select files to upload.'}
              </span>
            </div>
          )}

          {/* Analysis Results Section */}
          {analysisResults.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold text-lg text-slate-700 mb-4">
                Analysis Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysisResults.map((result, index) => (
                  <div key={index} className={`border rounded-lg overflow-hidden shadow-sm ${result.isError ? 'border-red-300' : ''}`}>
                    <div className={`p-3 ${result.isError ? 'bg-red-50' : 'bg-slate-50'} border-b`}>
                      <p className="font-medium text-slate-700 truncate">{result.fileName}</p>
                      {!result.isError && !result.processing && (
                        <p className="text-sm font-medium text-cyan-600">
                          Tumor type: <span className="bg-cyan-100 px-2 py-0.5 rounded-full">{result.prediction || "Unknown"}</span>
                        </p>
                      )}
                      {result.processing && (
                        <p className="text-sm font-medium text-amber-600">
                          Processing...
                        </p>
                      )}
                    </div>
                    <div className="p-4 flex justify-center">
                      {result.isError ? (
                        <div className="flex flex-col items-center text-red-500 p-4">
                          <AlertCircle size={48} className="mb-2" />
                          <p className="text-center">{result.error}</p>
                        </div>
                      ) : result.processing ? (
                        <div className="flex flex-col items-center text-amber-500 p-4">
                          <div className="animate-spin h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full mb-2"></div>
                          <p className="text-center">Analyzing image...</p>
                        </div>
                      ) : (
                        <img
                          src={result.resultImage}
                          alt={`Analysis result for ${result.fileName}`}
                          className="max-w-full h-auto rounded"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Alert Modal */}
          {showAlert && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 animate-fade-in">
                <div className="flex flex-col items-center text-center">
                  {uploadStatus === "success" ? (
                    <>
                      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Check size={32} className="text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Data Stored Successfully!</h3>
                      <p className="text-slate-600 mb-6">{alertMessage}</p>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200 mb-4 text-left w-full">
                        <p className="text-sm text-green-700">
                          <span className="font-medium">Database confirmation:</span> Medical scan data has been saved in the system and is now available for review.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle size={32} className="text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Error</h3>
                      <p className="text-slate-600 mb-6">{alertMessage}</p>
                    </>
                  )}
                  <button
                    onClick={clearForm}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all cursor-pointer w-full"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 mr-4 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            {renderActionButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanReports;
