import React from "react";
import {
  Calendar,
  BarChart2,
  FileText,
  Home,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ mobileSidebarOpen }) => {
  const navigate = useNavigate();
  
  const handleNavigation = (route) => {
    if (route === "AI Analysis") {
      navigate("/scanReports");
    }
    if (route === "Reports") {
      navigate("/all-tests");
    } 
  };


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
        ].map((item, index) => (
          <div key={index} className="group">
            <div 
              className="flex items-center p-3 hover:bg-white hover:text-black hover:bg-opacity-5 rounded-xl cursor-pointer transition-all duration-200"
              onClick={() => handleNavigation(item.label)}
            >
              <div className="bg-white text-black bg-opacity-10 p-2 rounded-lg group-hover:bg-opacity-20">
                {item.icon}
              </div>
              <span className="ml-3 font-medium">{item.label}</span>
            </div>
          </div>
        ))}
      </nav>

     
    </div>
  );
};

export default Sidebar;
