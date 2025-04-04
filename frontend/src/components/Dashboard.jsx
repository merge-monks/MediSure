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
import { getCurrentUser, getUserId } from "../services/authService";

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
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check for authentication token and userId
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const userId = getUserId();
    
    if (!token || !userId) {
      navigate('/login');
      return;
    }
    
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const data = await getCurrentUser();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    // Fetch tests data for the specific user
    const fetchTestsData = async () => {
      try {
        setIsLoading(true);
        const data = await getMedicalReports();
        
        if (data.success) {
          // Always initialize with zeros for a new user
          const totalTests = data.reports ? data.reports.length : 0;
          
          setAnalyticsData(prevData => prevData.map((item, index) => {
            if (index === 0) { // Tests Today
              return {
                ...item,
                value: totalTests.toString(), 
                trend: totalTests > 0 ? "+15%" : "0%",
              };
            } else if (index === 1) { // Pending Analysis
              const pendingTests = data.reports ? data.reports.filter(report => 
                report.status === 'pending' || report.status === 'in-progress'
              ).length : 0;
              return {
                ...item,
                value: pendingTests.toString()
              };
            } else if (index === 2) { // New Patients
              // Count unique patients
              const uniquePatients = data.reports ? new Set(data.reports.map(report => report.patient)).size : 0;
              return {
                ...item,
                value: uniquePatients.toString()
              };
            }
            return item;
          }));
        } else {
          // Show zero for this specific user
          resetAnalyticsData();
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        // Reset analytics for this user
        resetAnalyticsData();
      } finally {
        setIsLoading(false);
      }
    };

    const resetAnalyticsData = () => {
      setAnalyticsData(prevData => prevData.map((item, index) => {
        if ([0, 1, 2].includes(index)) {
          return {
            ...item,
            value: "0",
            trend: "0%",
          };
        }
        return item;
      }));
    };

    fetchUserData();
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

        <Header 
          navigateToScanReports={navigateToScanReports} 
          userData={userData} // Pass user data to header
        />

        {isLoading ? (
          <div className="flex justify-center items-center p-6">
            <Loader className="animate-spin text-cyan-600" size={24} />
          </div>
        ) : (
          <AnalyticsBar analyticsData={analyticsData} />
        )}

        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <DoctorInfoCard userData={userData} /> {/* Pass user data to doctor info card */}
          
          <TestDistributionChart testsData={[]} />
          
          <TestScheduleCalendar />
          
          <RecentTestsSection recentTests={[]} />
        </div>
      </div>
    </div>
  );
};

export default MedisureDashboard;
