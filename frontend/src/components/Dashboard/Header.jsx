import React from "react";
import { Plus, Bell, ChevronRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

const Header = ({ navigateToScanReports, userData }) => {
  const navigate = useNavigate();

  // Get user's initials for avatar
  const getInitials = () => {
    if (!userData) return "DR";
    return `${userData.firstName?.charAt(0) || ''}${userData.lastName?.charAt(0) || ''}`;
  };

  // Get user's full name
  const getFullName = () => {
    if (!userData) return "Doctor";
    return `Dr. ${userData.firstName || ''} ${userData.lastName || ''}`;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-white p-4 lg:p-6 flex justify-between items-center shadow-sm sticky top-0 z-10">
      <div className="ml-8 lg:ml-0">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Hello, {userData?.firstName || "Doctor"}!
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:scale-105 duration-300"
          onClick={navigateToScanReports}
        >
          <Plus size={18} className="mr-2" />
          <span>Scan Reports</span>
        </button>
        <div className="relative">
          <button className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors relative">
            {/* <Bell size={20} /> */}
            {/* <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span> */}
          </button>
        </div>
        <div className="flex items-center ml-2 bg-gradient-to-r from-slate-50 to-cyan-50 p-1.5 rounded-xl shadow-sm">
          <div className="bg-cyan-600 to-blue-600 text-white rounded-lg w-9 h-9 flex items-center justify-center">
            <span className="text-xs font-bold">{getInitials()}</span>
          </div>
          <div className="ml-3">
            <span className="text-sm font-medium text-slate-700 block leading-tight">
              {getFullName()}
            </span>
            
            <span className="text-xs text-slate-500">{userData?.specialty || "Specialist"}</span>
          </div>
          {/* <<ChevronRight size={16} className="ml-2 text-slate-400" /> */}
        </div>
        <button 
          onClick={handleLogout}
          className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors flex items-center"
          title="Logout"
        >
          <LogOut size={18} className="text-slate-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;
