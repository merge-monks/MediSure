import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  Upload,
  FileText,
  Image,
  AlertCircle,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScanReports = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'uploading', 'success', 'error'
  const fileInputRef = useRef(null);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [analysisError, setAnalysisError] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

 
  const navigateToDash = () => {
    navigate('/Dashboard');
  }
  const handleCancel = () => {
    // Clear selected files and reset states
    setSelectedFiles([]);
    setUploadStatus(null);
    setAnalysisResults([]);
    setAnalysisError(null);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setUploadStatus(null);
      setAnalysisResults([]);
      setAnalysisError(null);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadStatus('error');
      setAnalysisError('Please select files to upload.');
      return;
    }

    setUploadStatus("uploading");
    setAnalysisResults([]);
    setAnalysisError(null);
    setProgress({ current: 0, total: selectedFiles.length });
    
    const results = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      setProgress({ current: i + 1, total: selectedFiles.length });
      
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: formData,
          // Explicitly set mode to cors
          mode: 'cors',
          headers: {
            'Accept': 'image/png',
          },
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        // Get the blob from the response
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        
        results.push({
          fileName: file.name,
          resultImage: imageUrl
        });
      } catch (error) {
        console.error(`Error analyzing image ${file.name}:`, error);
        results.push({
          fileName: file.name,
          error: error.message,
          isError: true
        });
      }
    }
    
    setAnalysisResults(results);
    
    // Check if any results had errors
    const hasErrors = results.some(result => result.isError);
    if (hasErrors) {
      setUploadStatus('partial');
      setAnalysisError('Some files could not be analyzed. Check the results below.');
    } else {
      setUploadStatus('success');
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current.click();
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
                'bg-red-50 text-red-700'}`
              }
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
                    </div>
                    <div className="p-4 flex justify-center">
                      {result.isError ? (
                        <div className="flex flex-col items-center text-red-500 p-4">
                          <AlertCircle size={48} className="mb-2" />
                          <p className="text-center">{result.error}</p>
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

          {/* Action buttons */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 mr-4 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={
                uploadStatus === "uploading" || selectedFiles.length === 0
              }
              className={`px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all cursor-pointer
                ${
                  uploadStatus === "uploading" || selectedFiles.length === 0
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
            >
              {uploadStatus === "uploading" ? "Analyzing..." : "Analyze Scans"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanReports;
