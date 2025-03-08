import React from "react";
import {
  Calendar,
  BarChart2,
  FileText,
  Settings,
  Home,
  Clock,
} from "lucide-react";

const Sidebar = ({ mobileSidebarOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 transform lg:relative lg:translate-x-0 transition duration-300 ease-in-out
          ${
            mobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          w-64 lg:w-72 bg-gradient-to-br from-cyan-700 to-blue-900 p-6 flex flex-col text-white shadow-xl`}
    >
      <div className="flex items-center mb-10">
        <div className="bg-white text-cyan-600 p-2 rounded-lg shadow-md flex items-center justify-center">
          <div className="h-6 w-6 pb-2 text-3xl flex items-center justify-center font-extrabold leading-none m">
            +
          </div>
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
          { icon: <BarChart2 size={18} />, label: "AI Analysis" },
          { icon: <FileText size={18} />, label: "Reports" },
          { icon: <Settings size={18} />, label: "Settings" },
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
        <p className="text-sm opacity-90">
          You have 5 appointments scheduled for today
        </p>
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
  );
};

export default Sidebar;
