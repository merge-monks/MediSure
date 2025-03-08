import React from "react";
import { User } from "lucide-react";

const DoctorInfoCard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start mb-6">
        <div className="bg-cyan-500 to-blue-600 rounded-xl w-14 h-14 flex items-center justify-center shadow-md">
          <User size={24} className="text-white" />
        </div>
        <div className="ml-4">
          <h2 className="font-bold text-lg text-slate-800">
            Dr. Manas Kumar
          </h2>
          <p className="text-sm text-cyan-600 font-medium">
            M.D., Radiology
          </p>
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
            <p className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">
              January 2023
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
          <p className="text-slate-500 text-sm mb-1">Expertise</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs bg-cyan-100 text-cyan-600 px-2 py-1 rounded-lg">
              CT Scans
            </span>
            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-lg">
              MRI
            </span>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-lg">
              X-Ray
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoCard;
