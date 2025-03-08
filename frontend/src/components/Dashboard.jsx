import React, { useState } from 'react';
import { Calendar, User, BarChart2, FileText, Users, Home, Settings, Bell, Search, 
  ChevronLeft, ChevronRight, Menu, X, Plus, Clock, PieChart, Activity, ArrowRight, 
  Calendar as CalendarIcon, Filter, TrendingUp, MessageSquare } from 'lucide-react';

const MedisureDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(7);
  const [currentMonth, setCurrentMonth] = useState('January 2023');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Calendar data
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
      image: '/api/placeholder/400/200', 
      color: 'from-cyan-500 to-blue-500',
      description: 'Cranial examination',
      date: 'Jan 12, 2023',
      status: 'Completed',
      patient: 'Sarah Johnson, 42',
      doctor: 'Dr. Williams'
    },
    { 
      name: 'X-Ray', 
      image: '/api/placeholder/400/200', 
      color: 'from-purple-500 to-indigo-500',
      description: 'Thoracic cavity',
      date: 'Jan 10, 2023',
      status: 'Completed',
      patient: 'Robert Davis, 56',
      doctor: 'Dr. Chen'
    },
    { 
      name: 'ECG', 
      image: '/api/placeholder/400/200', 
      color: 'from-rose-400 to-red-500',
      description: 'Cardiac rhythm analysis',
      date: 'Jan 7, 2023',
      status: 'Completed',
      patient: 'Emma Wilson, 68',
      doctor: 'Dr. Patel'
    }
  ];
  
  // Calendar test entries
  const testEntries = [
    { id: 1, type: 'CT SCAN', time: '10:45', patient: 'Sarah Johnson', status: 'scheduled', color: 'bg-blue-500' },
    { id: 2, type: 'CT SCAN', time: '11:30', patient: 'Robert Davis', status: 'completed', color: 'bg-emerald-500' },
    { id: 3, type: 'CT SCAN', time: '13:15', patient: 'Emma Wilson', status: 'in-progress', color: 'bg-amber-500' },
    { id: 4, type: 'CT SCAN', time: '14:45', patient: 'Michael Brown', status: 'scheduled', color: 'bg-blue-500' },
    { id: 5, type: 'CT SCAN', time: '16:00', patient: 'Jennifer Lee', status: 'scheduled', color: 'bg-blue-500' }
  ];

  // Stats and analytics data
  const analyticsData = [
    { title: 'Tests Today', value: '12', trend: '+15%', color: 'bg-cyan-100 text-cyan-600' },
    { title: 'Pending Analysis', value: '7', trend: '-10%', color: 'bg-amber-100 text-amber-600' },
    { title: 'New Patients', value: '5', trend: '+8%', color: 'bg-emerald-100 text-emerald-600' },
    { title: 'Test Efficiency', value: '94%', trend: '+2%', color: 'bg-indigo-100 text-indigo-600' }
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
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
            w-64 lg:w-72 bg-gradient-to-br from-cyan-700 to-blue-900 p-6 flex flex-col text-white shadow-xl`}>
        <div className="flex items-center mb-10">
          <div className="bg-white text-cyan-600 p-2 rounded-lg shadow-md">
            <div className="h-6 w-6 flex items-center justify-center font-bold">+</div>
          </div>
          <h1 className="ml-3 font-bold text-2xl tracking-tight">Medisure</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          <div className="group">
            <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-xl cursor-pointer transition-all duration-200 backdrop-blur-sm shadow-sm">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Home size={18} className="text-black" />
              </div>
              <span className="ml-3 font-medium text-black">Dashboard</span>
            </div>
          </div>
          
          {[
            { icon: <BarChart2 size={18} />, label: 'AI Analysis' },
            { icon: <FileText size={18} />, label: 'Reports' },
            { icon: <Settings size={18} />, label: 'Settings' }
          ].map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center p-3 hover:bg-white hover:text-black hover:bg-opacity-5 rounded-xl cursor-pointer transition-all duration-200">
                <div className="bg-white text-black bg-opacity-10 p-2 rounded-lg group-hover:bg-opacity-20">
                  {item.icon}
                </div>
                <span className="ml-3 font-medium">{item.label}</span>
              </div>
            </div>
          ))}
        </nav>
        
        <div className="mt-8 p-4 bg-cyan-600 to-blue-600 rounded-xl shadow-lg">
          <div className="flex items-center mb-3">
            <div className="bg-white p-2 rounded-lg">
              <Calendar size={18} className="text-cyan-700" />
            </div>
            <h3 className="ml-3 font-medium">Today's Schedule</h3>
          </div>
          <p className="text-sm opacity-90">You have 5 appointments scheduled for today</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center bg-white bg-opacity-10 p-2 rounded-lg">
              <Clock size={14} className="mr-2" />
              <span className="text-xs text-black">10:45 - Sarah Johnson</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-10 p-2 rounded-lg">
              <Clock size={14} className="mr-2" />
              <span className="text-xs text-black">13:15 - Emma Wilson</span>
            </div>
          </div>
          <button className="mt-4 bg-white text-cyan-700 px-4 py-2 rounded-lg text-sm font-medium w-full transition-all hover:bg-opacity-90 shadow-sm">
            View All Appointments
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
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center bg-cyan-500 to-blue-500 text-white px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all">
              <Plus size={18} className="mr-2" />
              <span>New Scan</span>
            </button>
            <div className="relative">
              <button className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center ml-2 bg-gradient-to-r from-slate-50 to-cyan-50 p-1.5 rounded-xl shadow-sm">
              <div className="bg-cyan-600 to-blue-600 text-white rounded-lg w-9 h-9 flex items-center justify-center">
                <span className="text-xs font-bold">DK</span>
              </div>
              <div className="ml-3">
                <span className="text-sm font-medium text-slate-700 block leading-tight">Dr. Manas Kumar</span>
                <span className="text-xs text-slate-500">Radiology</span>
              </div>
              <ChevronRight size={16} className="ml-2 text-slate-400" />
            </div>
          </div>
        </header>
        
        {/* Analytics bar */}
        <div className="px-6 lg:px-8 pt-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {analyticsData.map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-50 hover:shadow-sm transition-all">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm text-slate-500">{item.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-lg ${item.color}`}>
                      {item.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-2">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Dashboard content */}
        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Doctor info card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start mb-6">
              <div className="bg-cyan-500 to-blue-600 rounded-xl w-14 h-14 flex items-center justify-center shadow-md">
                <User size={24} className="text-white" />
              </div>
              <div className="ml-4">
                <h2 className="font-bold text-lg text-slate-800">Dr. Manas Kumar</h2>
                <p className="text-sm text-cyan-600 font-medium">M.D., Radiology</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-emerald-600 ml-1">Online</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                <p className="text-slate-500 text-sm mb-1">Department</p>
                <p className="font-medium text-slate-800 flex items-center">
                  <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                  Radiology
                </p>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                <p className="text-slate-500 text-sm mb-1">Hospital</p>
                <p className="font-medium text-slate-800 flex items-center">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Crossroads Premier Hospital
                </p>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                <p className="text-slate-500 text-sm mb-1">Appointments</p>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-slate-800">27</p>
                  <p className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">January 2023</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                <p className="text-slate-500 text-sm mb-1">Expertise</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-cyan-100 text-cyan-600 px-2 py-1 rounded-lg">CT Scans</span>
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-lg">MRI</span>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-lg">X-Ray</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tests percentage donut chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-700">Test Distribution</h3>
              <div className="flex items-center text-sm text-cyan-600">
                <Filter size={14} className="mr-1" />
                <span>Filter</span>
              </div>
            </div>
            
            <div className="flex justify-center items-center mb-6">
              <div className="w-56 h-56 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white p-4 rounded-full shadow-md">
                    <p className="text-sm font-medium text-slate-600">Total Tests</p>
                    <p className="text-2xl font-bold text-slate-800">428</p>
                    <p className="text-xs text-cyan-600">+8% from last month</p>
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
                <div key={test.name} className="flex items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-lg ${test.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                    {test.percentage}%
                  </div>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-slate-700 block">{test.name}</span>
                    <span className="text-xs text-slate-500">{Math.round(428 * test.percentage / 100)} tests</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full py-2.5 text-sm font-medium text-center text-cyan-600 bg-cyan-50 rounded-xl hover:bg-cyan-100 transition-colors">
              View Detailed Report
            </button>
          </div>
          
          {/* Calendar and tests */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-700">Tests Schedule</h2>
              <div className="bg-cyan-50 text-cyan-600 px-3 py-1 rounded-lg text-sm font-medium">
                <CalendarIcon size={14} className="inline mr-1" /> Jan 2023
              </div>
            </div>
            
            <div className="mb-6 flex justify-between items-center">
              <button className="text-cyan-600 hover:bg-cyan-50 p-1.5 rounded-lg transition-colors">
                <ChevronLeft size={18} />
              </button>
              <span className="font-medium text-slate-800">{currentMonth}</span>
              <button className="text-cyan-600 hover:bg-cyan-50 p-1.5 rounded-lg transition-colors">
                <ChevronRight size={18} />
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
                    const hasEvents = date === 7 || date === 12 || date === 15 || date === 20;
                    
                    return (
                      <div 
                        key={`${weekIndex}-${dateIndex}`}
                        className={`
                          relative text-center py-2 text-sm rounded-lg transition-all duration-200
                          ${isCurrentMonth ? 'text-slate-400' : 'text-slate-700'}
                          ${isSelected 
                            ? 'bg-cyan-500 to-blue-500 text-white shadow-sm' 
                            : 'hover:bg-slate-100 cursor-pointer'}
                        `}
                        onClick={() => setSelectedDate(date)}
                      >
                        {date}
                        {hasEvents && !isSelected && (
                          <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-500"></span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="flex border-b mb-4">
              <button 
                className={`flex-1 text-sm py-2 border-b-2 transition-colors
                  ${activeTab === 'all' ? 'border-cyan-500 text-cyan-600 font-medium' : 'border-transparent text-slate-500 hover:text-slate-700'}
                `}
                onClick={() => setActiveTab('all')}
              >
                All Tests
              </button>
              <button 
                className={`flex-1 text-sm py-2 border-b-2 transition-colors
                  ${activeTab === 'pending' ? 'border-cyan-500 text-cyan-600 font-medium' : 'border-transparent text-slate-500 hover:text-slate-700'}
                `}
                onClick={() => setActiveTab('pending')}
              >
                Pending
              </button>
            </div>
            
            <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
              <div className="flex items-center">
                <div className="w-1 h-5 bg-cyan-500 rounded-full mr-2"></div>
                <div className="text-sm font-medium text-slate-700">January 12</div>
              </div>
              
              <div className="space-y-2.5 mt-2">
                {testEntries.map((entry) => (
                  <div key={entry.id} className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className={`w-2 h-8 ${entry.color} rounded-full mr-2`}></div>
                        <span className="text-sm font-bold text-slate-700">{entry.type}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-lg ${
                        entry.status === 'completed' 
                          ? 'bg-emerald-100 text-emerald-600' 
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
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-slate-500">{entry.patient}</div>
                      <ArrowRight size={14} className="text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="bg-cyan-500 to-blue-500 text-white w-full py-2.5 rounded-xl mt-4 text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center">
              <Plus size={16} className="mr-1" /> Add New Appointment
            </button>
          </div>
          
          {/* Recent tests section - full width */}
          <div className="col-span-1 lg:col-span-3 mt-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-slate-700 text-lg">Recent Tests Analyzed</h2>
              <button className="text-sm text-cyan-600 font-medium flex items-center hover:text-cyan-700 transition-colors">
                View All <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTests.map((test) => (
                <div 
                  key={test.name} 
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className={`bg-gradient-to-r ${test.color} h-36 relative overflow-hidden`}>
                    <img 
                      src={test.image} 
                      alt={test.name} 
                      className="w-full h-full object-cover mix-blend-overlay opacity-70 group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <div className="flex items-center mb-1">
                        <span className="bg-white bg-opacity-30 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
                          {test.date}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-xl drop-shadow-sm">{test.name}</h3>
                      <p className="text-white text-sm opacity-90">{test.description}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{test.patient}</p>
                        <p className="text-xs text-slate-500">Attending: {test.doctor}</p>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-lg">
                        {test.status}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 hover:bg-cyan-100 transition-colors">
                          <Activity size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors">
                          <PieChart size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors">
                          <TrendingUp size={18} />
                        </button>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                        <ArrowRight size={18} />
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