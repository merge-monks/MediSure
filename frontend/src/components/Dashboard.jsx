import React, { useState, useEffect } from "react";
import { Menu, X, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  Header,
  AnalyticsBar,
  DoctorInfoCard,
  TestDistributionChart,
  TestScheduleCalendar,
  RecentTestsSection
} from "./Dashboard/index";
import { getMedicalReports } from "../services/apiService";

const MedisureDashboard = () => {
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState([
    {
      title: "Tests Today",
      value: "0",
      trend: "0%",
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Pending Analysis",
      value: "0",
    },
    {
      title: "New Patients",
      value: "0",
    },
    {
      title: "Test Efficiency",
      value: "100%",
    },
  ]);
  
  useEffect(() => {
    // Check for authentication token
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
    
    const fetchTestsData = async () => {
      try {
        setIsLoading(true);
        const data = await getMedicalReports();
        
        if (data.success && data.reports) {
          // Update total tests count - all tests, not just today's
          const totalTests = data.reports.length;
          
          setAnalyticsData(prevData => prevData.map((item, index) => {
            if (index === 0) { // Tests Today
              return {
                ...item,
                value: totalTests.toString(), // Use all tests count for demonstration
                trend: totalTests > 0 ? "+15%" : "0%",
              };
            }
            return item;
          }));
        } else {
          // Show zero instead of default values
          setAnalyticsData(prevData => prevData.map((item, index) => {
            if (index === 0) { // Tests Today
              return {
                ...item,
                value: "0",
                trend: "0%",
              };
            }
            return item;
          }));
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        // Show zero instead of default values
        setAnalyticsData(prevData => prevData.map((item, index) => {
          if (index === 0) { // Tests Today
            return {
              ...item,
              value: "0",
              trend: "0%",
            };
          }
          return item;
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestsData();
  }, [navigate]);
  
  const navigateToScanReports = () => {
    navigate("/ScanReports");
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-full bg-white shadow-lg text-cyan-600"
        >
          {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <Sidebar mobileSidebarOpen={mobileSidebarOpen} />

      <div className="flex-1 overflow-auto relative">
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
        )}

        <Header navigateToScanReports={navigateToScanReports} />

        {isLoading ? (
          <div className="flex justify-center items-center p-6">
            <Loader className="animate-spin text-cyan-600" size={24} />
          </div>
        ) : (
          <AnalyticsBar analyticsData={analyticsData} />
        )}

        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <DoctorInfoCard />
          
          <TestDistributionChart testsData={[]} />
          
          <TestScheduleCalendar />
          
          <RecentTestsSection recentTests={[]} />
        </div>
      </div>
    </div>
  );
};

export default MedisureDashboard;
