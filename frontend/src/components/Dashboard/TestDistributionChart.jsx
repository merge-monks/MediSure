import React, { useState, useEffect } from "react";
import { Filter, Loader, PieChart } from "lucide-react";
import { getMedicalReports } from "../../services/apiService";

const TestDistributionChart = ({ testsData: defaultTestsData }) => {
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalTests, setTotalTests] = useState(0);
  const [noData, setNoData] = useState(false);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);
        const data = await getMedicalReports();

        if (data.success && data.reports && data.reports.length > 0) {
          // Process the data to calculate distribution
          const reports = data.reports;
          setTotalTests(reports.length);

          // Count by test type
          const testCounts = {
            "Brain Tumor Scan": 0,
            "Bone Tissue Scan": 0,
          };

          reports.forEach((report) => {
            const testName = report.name ? report.name.toLowerCase() : "";
            if (testName.includes("brain") || report.scanType === "MRI scan") {
              testCounts["Brain Tumor Scan"]++;
            } else if (
              testName.includes("bone") ||
              report.scanType === "CT scan"
            ) {
              testCounts["Bone Tissue Scan"]++;
            }
          });

          // Calculate percentages and create testsData
          const formattedData = [
            {
              name: "Brain Tumor Scan",
              percentage:
                Math.round(
                  (testCounts["Brain Tumor Scan"] / reports.length) * 100
                ) || 0,
              color: "bg-cyan-500",
            },
            {
              name: "Bone Tissue Scan",
              percentage:
                Math.round(
                  (testCounts["Bone Tissue Scan"] / reports.length) * 100
                ) || 0,
              color: "bg-indigo-500",
            },
          ];

          setTestsData(formattedData);
          setNoData(false);
        } else {
          // Show no data message instead of default data
          setNoData(true);
          setTotalTests(0);
          setTestsData([]);
        }
      } catch (error) {
        console.error("Error fetching test distribution data:", error);
        setError("Failed to load test distribution");
        setNoData(true);
        setTotalTests(0);
        setTestsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [defaultTestsData]);

  if (loading) {
    return (
      <div
        className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex justify-center items-center"
        style={{ minHeight: "420px" }}
      >
        <Loader className="animate-spin text-cyan-600" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (noData) {
    return (
      <div
        className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        style={{ minHeight: "420px" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-slate-700">Test Distribution</h2>
        </div>

        <div className="flex flex-col justify-center items-center h-full">
          <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <PieChart size={32} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-2">
            No test distribution data
          </h3>
          <p className="text-slate-500 text-center max-w-xs">
            You haven't analyzed any medical scans yet. Your test distribution
            will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4"></div>

      <div className="flex justify-center items-center mb-6">
        <div className="w-56 h-56 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white p-4 rounded-full shadow-md">
              <p className="text-sm font-medium text-slate-600">Total Tests</p>
              <p className="text-2xl font-bold text-slate-800">{totalTests}</p>
            </div>
          </div>

          <svg
            viewBox="0 0 100 100"
            className="transform -rotate-90 w-full h-full"
          >
            {testsData.map((test, index) => {
              const prevPercent = testsData
                .slice(0, index)
                .reduce((sum, item) => sum + item.percentage, 0);
              const sweep = (test.percentage / 100) * circumference;

              return (
                <circle
                  key={test.name}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={test.color.replace("bg-", "var(--color-")}
                  strokeWidth="20"
                  strokeDasharray={`${sweep} ${circumference}`}
                  strokeDashoffset={-((prevPercent / 100) * circumference)}
                  className={test.color.replace("bg-", "text-")}
                />
              );
            })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {testsData.map((test) => (
          <div
            key={test.name}
            className="flex items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-lg ${test.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}
            >
              {test.percentage}%
            </div>
            <div className="ml-2">
              <span className="text-sm font-medium text-slate-700 block">
                {test.name}
              </span>
              <span className="text-xs text-slate-500">
                {Math.round((totalTests * test.percentage) / 100)} tests
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2.5 text-sm font-medium text-center text-cyan-600 bg-cyan-50 rounded-xl hover:bg-cyan-100 transition-colors">
        View Detailed Report
      </button>
    </div>
  );
};

export default TestDistributionChart;
