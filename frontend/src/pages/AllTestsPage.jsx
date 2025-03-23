import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { getMedicalReports } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const AllTestsPage = () => {
  const [allTests, setAllTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTests = async () => {
      try {
        setLoading(true);
        const data = await getMedicalReports();
        
        if (data.success && data.reports) {
          setAllTests(data.reports);
        } else {
          setError("No test data available");
          setAllTests([]);
        }
      } catch (error) {
        console.error("Error fetching all tests:", error);
        setError("Failed to load tests");
        setAllTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTests();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <Loader className="animate-spin text-cyan-600" size={32} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button 
          onClick={handleGoBack} 
          className="mr-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">All Tests</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTests.length > 0 ? (
          allTests.map((test) => (
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

                
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-slate-500">
            No tests found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTestsPage;
