import React, { useEffect, useState } from "react";
import { Activity, PieChart, TrendingUp, ArrowRight, Loader } from "lucide-react";
import { getMedicalReports } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const RecentTestsSection = ({ recentTests: defaultTests }) => {
  const [recentTests, setRecentTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScanReports = async () => {
      try {
        setLoading(true);
        // Use the centralized API service instead of direct fetch
        const data = await getMedicalReports();
        
        if (data.success && data.reports && data.reports.length > 0) {
          setRecentTests(data.reports);
        } else {
          // If no real data, fall back to default test data
          setRecentTests(defaultTests);
        }
      } catch (error) {
        console.error("Error fetching scan reports:", error);
        setError("Failed to load recent tests");
        // Fall back to default test data on error
        setRecentTests(defaultTests);
      } finally {
        setLoading(false);
      }
    };

    fetchScanReports();
  }, [defaultTests]);

  // Function to handle navigating to all tests page
  const handleViewAll = () => {
    navigate("/all-tests");
  };



  if (loading) {
    return (
      <div className="col-span-1 lg:col-span-3 mt-4 flex justify-center items-center h-64">
        <Loader className="animate-spin text-cyan-600" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-1 lg:col-span-3 mt-4">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}. Using example data instead.
        </div>
        {/* Render the UI with default data */}
      </div>
    );
  }

  // Get only the first 3 tests to display
  const displayedTests = recentTests.slice(0, 3);

  return (
    <div className="col-span-1 lg:col-span-3 mt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-slate-700 text-lg">
          Recent Tests Analyzed
        </h2>
        <button 
          onClick={handleViewAll}
          className="text-sm text-cyan-600 font-medium flex items-center hover:text-cyan-700 transition-colors"
        >
          View All <ArrowRight size={16} className="ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedTests.length > 0 ? (
          displayedTests.map((test) => (
            <div
              key={test.id || test.name}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group"
            >
              <div className={`bg-gradient-to-r ${test.color} p-4`}>
                <div className="flex justify-between items-center">
                  <span className="bg-white text-slate-700 text-xs px-2 py-0.5 rounded-full">
                    {test.date}
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-lg">
                    {test.status}
                  </span>
                </div>
                <h3 className="text-white font-bold text-xl mt-2">
                  {test.name}
                </h3>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <p className="text-sm font-medium text-slate-800">
                    Patient: {test.patient}
                  </p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm text-slate-700 font-medium">Findings:</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {test.description || "No findings recorded"}
                  </p>
                </div>

                {/* Removed the arrow button - entire card is now clickable */}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-slate-500">
            No recent tests found
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTestsSection;
