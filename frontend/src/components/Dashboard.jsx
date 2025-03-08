import React, { useState } from "react";
import { Menu, X } from "lucide-react";
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

const MedisureDashboard = () => {
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Navigation functions
  const navigateToScanReports = () => {
    navigate("/ScanReports");
  };

  // Tests data for the donut chart
  const testsData = [
    { name: "ULTRASOUND", percentage: 35, color: "bg-emerald-400" },
    { name: "CT SCAN", percentage: 25, color: "bg-sky-400" },
    { name: "X-RAY", percentage: 20, color: "bg-amber-400" },
    { name: "MRI", percentage: 20, color: "bg-indigo-400" },
  ];

  // Recent tests data
  const recentTests = [
    {
      name: "CT Scan",
      image: "/api/placeholder/400/200",
      color: "from-cyan-500 to-blue-500",
      description: "Cranial examination",
      date: "Jan 12, 2023",
      status: "Completed",
      patient: "Sarah Johnson, 42",
      doctor: "Dr. Williams",
    },
    {
      name: "X-Ray",
      image: "/api/placeholder/400/200",
      color: "from-purple-500 to-indigo-500",
      description: "Thoracic cavity",
      date: "Jan 10, 2023",
      status: "Completed",
      patient: "Robert Davis, 56",
      doctor: "Dr. Chen",
    },
    {
      name: "ECG",
      image: "/api/placeholder/400/200",
      color: "from-rose-400 to-red-500",
      description: "Cardiac rhythm analysis",
      date: "Jan 7, 2023",
      status: "Completed",
      patient: "Emma Wilson, 68",
      doctor: "Dr. Patel",
    },
  ];

  // Calendar test entries
  const testEntries = [
    {
      id: 1,
      type: "CT SCAN",
      time: "10:45",
      patient: "Sarah Johnson",
      status: "scheduled",
      color: "bg-blue-500",
    },
    {
      id: 2,
      type: "CT SCAN",
      time: "11:30",
      patient: "Robert Davis",
      status: "completed",
      color: "bg-emerald-500",
    },
    {
      id: 3,
      type: "CT SCAN",
      time: "13:15",
      patient: "Emma Wilson",
      status: "in-progress",
      color: "bg-amber-500",
    },
    {
      id: 4,
      type: "CT SCAN",
      time: "14:45",
      patient: "Michael Brown",
      status: "scheduled",
      color: "bg-blue-500",
    },
    {
      id: 5,
      type: "CT SCAN",
      time: "16:00",
      patient: "Jennifer Lee",
      status: "scheduled",
      color: "bg-blue-500",
    },
  ];

  // Stats and analytics data
  const analyticsData = [
    {
      title: "Tests Today",
      value: "12",
      trend: "+15%",
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Pending Analysis",
      value: "7",
      trend: "-10%",
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "New Patients",
      value: "5",
      trend: "+8%",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Test Efficiency",
      value: "94%",
      trend: "+2%",
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

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

        <AnalyticsBar analyticsData={analyticsData} />

        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <DoctorInfoCard />
          
          <TestDistributionChart testsData={testsData} />
          
          <TestScheduleCalendar testEntries={testEntries} />
          
          <RecentTestsSection recentTests={recentTests || []} />
        </div>
      </div>
    </div>
  );
};

export default MedisureDashboard;
