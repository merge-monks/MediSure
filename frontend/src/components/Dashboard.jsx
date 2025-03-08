import React, { useState } from 'react';
import { Calendar, User, BarChart2, FileText, Users, Home, Settings, Bell, Search, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

const MedisureDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(7);
  const [currentMonth, setCurrentMonth] = useState('January 2023');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Calendar data
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const dates = [
    [29, 30, 31, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 1, 2]
  ];
  
  // Tests data for the donut chart
  const testsData = [
    { name: 'ULTRASOUND', percentage: 35, color: 'bg-emerald-400' },
    { name: 'CT SCAN', percentage: 25, color: 'bg-sky-400' },
    { name: 'X-RAY', percentage: 20, color: 'bg-amber-400' },
    { name: 'MRI', percentage: 20, color: 'bg-indigo-400' }
  ];
  
  // Recent tests data
  const recentTests = [
    { 
      name: 'CT Scan', 
      image: '/api/placeholder/120/120', 
      color: 'from-cyan-500 to-blue-500',
      description: 'Cranial examination',
      date: 'Jan 12, 2023',
      status: 'Completed'
    },
    { 
      name: 'X-Ray', 
      image: '/api/placeholder/120/120', 
      color: 'from-purple-500 to-indigo-500',
      description: 'Thoracic cavity',
      date: 'Jan 10, 2023',
      status: 'Completed'
    },
    { 
      name: 'ECG', 
      image: '/api/placeholder/120/120', 
      color: 'from-rose-400 to-red-500',
      description: 'Cardiac rhythm analysis',
      date: 'Jan 7, 2023',
      status: 'Completed'
    }
  ];
  
  // Calendar test entries
  const testEntries = [
    { id: 1, type: 'CT SCAN', time: '10:45', patient: 'Sarah Johnson', status: 'scheduled' },
    { id: 2, type: 'CT SCAN', time: '11:30', patient: 'Robert Davis', status: 'completed' },
    { id: 3, type: 'CT SCAN', time: '13:15', patient: 'Emma Wilson', status: 'in-progress' },
    { id: 4, type: 'CT SCAN', time: '14:45', patient: 'Michael Brown', status: 'scheduled' },
    { id: 5, type: 'CT SCAN', time: '16:00', patient: 'Jennifer Lee', status: 'scheduled' }
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button 
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-full bg-white shadow-lg text-cyan-600"
        >
          {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-20 transform lg:relative lg:translate-x-0 transition duration-300 ease-in-out
            ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            w-64 lg:w-72 bg-gradient-to-br from-cyan-700 to-blue-800 p-6 flex flex-col text-white shadow-xl`}>
        <div className="flex items-center mb-10">
          <div className="bg-white text-cyan-600 p-2 rounded-lg shadow-md">
            <div className="h-6 w-6 flex items-center justify-center font-bold">+</div>
          </div>
          <h1 className="ml-3 font-bold text-2xl tracking-tight">Medisure</h1>
        </div>
        
        <nav className="flex-1 space-y-1">
          <div className="group">
            <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-xl cursor-pointer transition-all duration-200 backdrop-blur-sm shadow-sm">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Home size={18} className="text-white" />
              </div>
              <span className="ml-3 font-medium">Dashboard</span>
            </div>
          </div>
          
          {[
            { icon: <Users size={18} />, label: 'Departments' },
            { icon: <BarChart2 size={18} />, label: 'AI Analysis' },
            { icon: <FileText size={18} />, label: 'Reports' },
            { icon: <User size={18} />, label: 'Patients' }
          ].map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-5 rounded-xl cursor-pointer transition-all duration-200">
                <div className="bg-white bg-opacity-10 p-2 rounded-lg group-hover:bg-opacity-20">
                  {item.icon}
                </div>
                <span className="ml-3 font-medium">{item.label}</span>
              </div>
            </div>
          ))}
        </nav>
        
        <div className="mt-8 p-4 bg-cyan-600 bg-opacity-50 rounded-xl">
          <div className="flex items-center mb-3">
            <div className="bg-white p-2 rounded-lg">
              <Calendar size={18} className="text-cyan-700" />
            </div>
            <h3 className="ml-3 font-medium">Upcoming</h3>
          </div>
          <p className="text-sm opacity-80">You have 5 appointments scheduled for today</p>
          <button className="mt-3 bg-white text-cyan-700 px-4 py-2 rounded-lg text-sm font-medium w-full transition-all hover:bg-opacity-90">
            View Schedule
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto relative">
        {/* Overlay for mobile sidebar */}
        {mobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
        )}
        
        {/* Header */}
        <header className="bg-white p-4 lg:p-6 flex justify-between items-center shadow-sm sticky top-0 z-10">
          <div className="relative w-72 ml-8 lg:ml-0">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              placeholder="Search patients, tests, reports..."
            />
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all">
              Scan Reports
            </button>
            <button className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              <Settings size={20} />
            </button>
            <button className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="flex items-center ml-4 bg-gradient-to-r from-slate-50 to-cyan-50 p-1.5 rounded-xl shadow-sm">
              <div className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-lg w-9 h-9 flex items-center justify-center">
                <span className="text-xs font-bold">DK</span>
              </div>
              <span className="ml-3 text-sm font-medium text-slate-700">Dr Manas Kumar</span>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Doctor info card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start mb-6">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl w-14 h-14 flex items-center justify-center shadow-md">
                <User size={24} className="text-white" />
              </div>
              <div className="ml-4">
                <h2 className="font-bold text-lg text-slate-800">Dr Manas</h2>
                <p className="text-sm text-cyan-600 font-medium">M.D., Radiology</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-slate-500 text-sm mb-1">Department</p>
                <p className="font-medium text-slate-800 flex items-center">
                  <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                  Radiology
                </p>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-slate-500 text-sm mb-1">Hospital</p>
                <p className="font-medium text-slate-800 flex items-center">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Crossroads Premier Hospital
                </p>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-slate-500 text-sm mb-1">Appointments</p>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-slate-800">27</p>
                  <p className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">January 2023, 13:48</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tests percentage donut chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-slate-700 mb-4">Test Distribution</h3>
            
            <div className="flex justify-center items-center mb-6">
              <div className="w-48 h-48 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white bg-opacity-80 p-3 rounded-full shadow-inner">
                    <p className="text-sm font-medium text-slate-600">Tests</p>
                    <p className="text-lg font-bold text-slate-800">Percentage</p>
                  </div>
                </div>
                
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  {testsData.map((test, index) => {
                    const prevPercent = testsData.slice(0, index).reduce((sum, item) => sum + item.percentage, 0);
                    const offset = prevPercent * 3.6; // 3.6 = 360 / 100
                    const sweep = test.percentage * 3.6;
                    
                    return (
                      <circle
                        key={test.name}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={test.color.replace('bg-', 'var(--color-')}
                        strokeWidth="20"
                        strokeDasharray={`${sweep} ${360 - sweep}`}
                        strokeDashoffset={-offset}
                        className={test.color.replace('bg-', 'text-')}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {testsData.map((test) => (
                <div key={test.name} className="flex items-center p-2 bg-slate-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-lg ${test.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                    {test.percentage}%
                  </div>
                  <span className="ml-2 text-sm font-medium text-slate-700">{test.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Calendar and tests */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-bold text-slate-700 mb-4">Tests Schedule</h2>
            
            <div className="mb-6 flex justify-between items-center">
              <button className="text-cyan-600 hover:bg-cyan-50 p-1 rounded-lg transition-colors">
                <ChevronLeft size={20} />
              </button>
              <span className="font-medium text-slate-800">{currentMonth}</span>
              <button className="text-cyan-600 hover:bg-cyan-50 p-1 rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-slate-500">
                    {day}
                  </div>
                ))}
              </div>
              
              {dates.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
                  {week.map((date, dateIndex) => {
                    const isCurrentMonth = date > 9 || (weekIndex < 2 && dateIndex > 2) || (weekIndex > 3 && dateIndex < 3);
                    const isSelected = date === selectedDate && weekIndex === 1;
                    
                    return (
                      <div 
                        key={`${weekIndex}-${dateIndex}`}
                        className={`
                          text-center py-1.5 text-sm rounded-lg transition-all duration-200
                          ${isCurrentMonth ? 'text-slate-400' : 'text-slate-700'}
                          ${isSelected 
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-sm' 
                            : 'hover:bg-slate-100 cursor-pointer'}
                        `}
                        onClick={() => setSelectedDate(date)}
                      >
                        {date}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="max-h-64 overflow-y-auto pr-2 mt-4">
              <div className="flex items-center">
                <div className="w-1 h-5 bg-cyan-500 rounded-full mr-2"></div>
                <div className="text-sm font-medium text-slate-700">12 January</div>
              </div>
              
              <div className="space-y-3 mt-3">
                {testEntries.map((entry) => (
                  <div key={entry.id} className="p-3 rounded-xl bg-gradient-to-r from-slate-50 to-cyan-50 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-slate-700">{entry.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-lg ${
                        entry.status === 'completed' 
                          ? 'bg-green-100 text-green-600' 
                          : entry.status === 'in-progress' 
                            ? 'bg-amber-100 text-amber-600' 
                            : 'bg-blue-100 text-blue-600'
                      }`}>
                        {entry.status === 'completed' 
                          ? 'Done' 
                          : entry.status === 'in-progress' 
                            ? 'In Progress' 
                            : entry.time}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{entry.patient}</div>
                  </div>
                ))}
              </div>
              
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white w-full py-2 rounded-xl mt-4 text-sm font-medium shadow-sm hover:shadow-md transition-all">
                Done
              </button>
            </div>
          </div>
          
          {/* Recent tests section - full width */}
          <div className="col-span-1 lg:col-span-3 mt-4">
            <h2 className="font-bold text-slate-700 text-lg mb-6">Recent Tests Analyzed</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTests.map((test) => (
                <div 
                  key={test.name} 
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className={`bg-gradient-to-r ${test.color} h-32 relative overflow-hidden`}>
                    <img 
                      src={test.image} 
                      alt={test.name} 
                      className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-white font-bold text-xl">{test.name}</h3>
                      <p className="text-white text-sm opacity-90">{test.description}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">{test.date}</span>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-lg">
                        {test.status}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <button className="text-cyan-600 text-sm font-medium">View Details</button>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-cyan-100 group-hover:text-cyan-600 transition-all">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedisureDashboard;