import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, ArrowRight, Loader } from "lucide-react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getMedicalReports } from "../../services/apiService";

const TestScheduleCalendar = () => {
  // Initialize with today's date
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [activeTab, setActiveTab] = useState("all");
  const [allTests, setAllTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to filter tests by date
  const filterTestsByDate = (date, testsData) => {
    if (!testsData || testsData.length === 0) {
      return [];
    }

    // Format selected date as YYYY-MM-DD for comparison
    const formattedDate = date.toISOString().split('T')[0];
    
    // Filter tests for the selected date
    const testsForDate = testsData.filter(test => {
      // Check if test has a date property and convert it to YYYY-MM-DD format
      if (test.date) {
        // Handle different date formats
        let testDate;
        if (test.date.includes('-')) {
          // If already in YYYY-MM-DD format
          testDate = test.date;
        } else {
          // If in format like "Jan 12, 2023"
          testDate = new Date(test.date).toISOString().split('T')[0];
        }
        
        // Filter by date and tab selection
        return (testDate === formattedDate) && 
               (activeTab === "all" || (activeTab === "pending" && test.status?.toLowerCase() !== "completed"));
      }
      return false;
    });
    
    // Map to the format needed for display
    return testsForDate.map((test, index) => ({
      id: test.id || index + 1,
      type: test.name || test.scanType || "SCAN",
      patient: test.patient || "Unknown Patient",
      status: test.status || "scheduled",
      color: getStatusColor(test.status),
    }));
  };

  // Fetch all tests when component mounts
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setIsLoading(true);
        const data = await getMedicalReports();
        console.log("Calendar fetched reports:", data);
        
        if (data.success) {
          // Always set allTests to an array, even if empty
          setAllTests(data.reports || []);
          
          // Only filter if there are reports
          if (data.reports && data.reports.length > 0) {
            const todaysDate = new Date(); // Get today's actual date
          todaysDate.setHours(0, 0, 0, 0); // normalize time

          // ✅ Trigger logic as if date was selected
          setSelectedDate(todaysDate); // visually select
          const tests = filterTestsByDate(todaysDate, data.reports); // filter
          setFilteredTests(tests);
          } else {
            setFilteredTests([]);
          }
        } else {
          setAllTests([]);
          setFilteredTests([]);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
        setAllTests([]);
        setFilteredTests([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTests();
  }, []);

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    
    // Filter tests for the newly selected date
    const testsForSelectedDate = filterTestsByDate(date, allTests);
    setFilteredTests(testsForSelectedDate);
  };

  // Re-filter tests when tab changes
  useEffect(() => {
    // Re-filter with current selected date when tab changes
    const testsForSelectedDate = filterTestsByDate(selectedDate, allTests);
    setFilteredTests(testsForSelectedDate);
  }, [activeTab]);

  // Helper function to determine color based on status
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed':
        return "bg-emerald-500";
      case 'in-progress':
        return "bg-amber-500";
      case 'scheduled':
      default:
        return "bg-blue-500";
    }
  };

  // Function to show status text
  const getStatusText = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed':
        return "Done";
      case 'in-progress':
        return "In Progress";
      case 'scheduled':
      default:
        return "Scheduled";
    }
  };

  // Function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-slate-700">Tests Schedule</h2>
        <div className="bg-cyan-50 text-cyan-600 px-3 py-1 rounded-lg text-sm font-medium">
          {isToday(selectedDate) ? "Today" : ""}
        </div>
      </div>

      <div className="mb-6">
        <div className="react-calendar-custom">
          <Calendar 
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date }) => {
              // Add custom classes for dates with events and for today
              const classes = [];
              
              // Check if this date is today
              if (isToday(date)) {
                classes.push('today-date');
              }
              
              // Check if any tests exist for this date
              if (allTests.length > 0) {
                const formattedDate = date.toISOString().split('T')[0];
                const hasTests = allTests.some(test => {
                  if (test.date) {
                    let testDate;
                    if (test.date.includes('-')) {
                      testDate = test.date;
                    } else {
                      testDate = new Date(test.date).toISOString().split('T')[0];
                    }
                    return testDate === formattedDate;
                  }
                  return false;
                });
                
                if (hasTests) {
                  classes.push('has-events');
                }
              }
              
              return classes.join(' ');
            }}
          />
        </div>
      </div>

      <div className="flex border-b mb-4">
        <button
          className={`flex-1 text-sm py-2 border-b-2 transition-colors
            ${
              activeTab === "all"
                ? "border-cyan-500 text-cyan-600 font-medium"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }
          `}
          onClick={() => setActiveTab("all")}
        >
          All Tests
        </button>
        <button
          className={`flex-1 text-sm py-2 border-b-2 transition-colors
            ${
              activeTab === "pending"
                ? "border-cyan-500 text-cyan-600 font-medium"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }
          `}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
        <div className="flex items-center">
          <div className="w-1 h-5 bg-cyan-500 rounded-full mr-2"></div>
          <div className="text-sm font-medium text-slate-700">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            {isToday(selectedDate) && " (Today)"}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader className="animate-spin text-cyan-600" size={24} />
          </div>
        ) : filteredTests.length > 0 ? (
          <div className="space-y-2.5 mt-2">
            {filteredTests.map((entry) => (
              <div
                key={entry.id}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-8 ${entry.color} rounded-full mr-2`}
                    ></div>
                    <span className="text-sm font-bold text-slate-700">
                      {entry.type}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-lg ${
                      entry.status === "completed"
                        ? "bg-emerald-100 text-emerald-600"
                        : entry.status === "in-progress"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {getStatusText(entry.status)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-slate-500">
                    {entry.patient}
                  </div>
                  <ArrowRight size={14} className="text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-32 text-center">
            <div className="text-slate-400 mb-2">
              <CalendarIcon size={24} />
            </div>
            <p className="text-slate-500 text-sm">
              No scans scheduled for this date
            </p>
          </div>
        )}
      </div>

      {/* CSS for styling the React Calendar */}
      <style jsx>{`
        .react-calendar-custom .react-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
        }
        
        .react-calendar-custom .react-calendar__tile {
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
        }
        
        .react-calendar-custom .react-calendar__tile--active {
          background: #06b6d4;
          color: white;
        }
        
        .react-calendar-custom .react-calendar__tile.today-date {
          background-color: #e0f2fe;
          font-weight: bold;
        }
        
        .react-calendar-custom .react-calendar__tile.has-events::after {
          content: '';
          display: block;
          width: 4px;
          height: 4px;
          background-color: #06b6d4;
          border-radius: 50%;
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .react-calendar-custom .react-calendar__navigation {
          margin-bottom: 8px;
        }
        
        .react-calendar-custom .react-calendar__navigation button {
          color: #06b6d4;
          border-radius: 6px;
        }
        
        .react-calendar-custom .react-calendar__navigation button:hover {
          background-color: #ecfeff;
        }
      `}</style>
    </div>
  );
};

export default TestScheduleCalendar;
