import React, { useState, useEffect } from "react";
import { User, AlertCircle } from "lucide-react";
import { getCurrentUser } from "../../services/authService";

const DoctorInfoCard = ({ userData: propUserData }) => {
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    title: "",
    specialty: "",
    department: "",
    hospital: "",
    appointments: 0,
    expertise: [],
    isOnline: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // If we already have user data from props, use it
        if (propUserData) {
          setDoctor({
            firstName: propUserData.firstName || "",
            lastName: propUserData.lastName || "",
            title: propUserData.title || "",
            specialty: propUserData.specialty || "",
            department: propUserData.specialty || "",
            hospital: propUserData.practiceName || "",
            appointments: propUserData.appointments || 27,
            expertise: propUserData.expertise || ["CT Scans", "MRI", "X-Ray"],
            isOnline: true
          });
          setLoading(false);
          return;
        }

        // Otherwise, fetch user data
        const userData = await getCurrentUser();
        
        // Transform received data to match our component state
        setDoctor({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          title: userData.title || "",
          specialty: userData.specialty || "",
          department: userData.specialty || "",
          hospital: userData.practiceName || "",
          appointments: userData.appointments || 27,
          expertise: userData.expertise || ["CT Scans", "MRI", "X-Ray"],
          isOnline: true
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctor data:", err);
        setError("Unable to connect to server. Showing demo data.");
        
        // Fallback to demo data
        setDoctor({
          firstName: "Manas",
          lastName: "Kumar",
          title: "MD",
          specialty: "Radiology",
          department: "Radiology",
          hospital: "Civil Hospital",
          appointments: 27,
          expertise: ["CT Scans", "MRI", "X-Ray"],
          isOnline: true
        });
        
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [propUserData]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm animate-pulse">
        <div className="flex items-start mb-6">
          <div className="bg-slate-200 rounded-xl w-14 h-14"></div>
          <div className="ml-4 space-y-2">
            <div className="h-5 bg-slate-200 rounded w-36"></div>
            <div className="h-4 bg-slate-200 rounded w-24"></div>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-14 bg-slate-100 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      {error && (
        <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center text-xs text-amber-700">
          <AlertCircle size={14} className="mr-1 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="flex items-start mb-6">
        <div className="bg-cyan-500 to-blue-600 rounded-xl w-14 h-14 flex items-center justify-center shadow-md">
          <User size={24} className="text-white" />
        </div>
        <div className="ml-4">
          <h2 className="font-bold text-lg text-slate-800">
            Dr. {doctor.firstName} {doctor.lastName}
          </h2>
          <p className="text-sm text-cyan-600 font-medium">
            {doctor.title}, {doctor.specialty}
          </p>
          <div className="flex items-center mt-1">
            <div className={`w-2 h-2 ${doctor.isOnline ? 'bg-emerald-500' : 'bg-gray-400'} rounded-full`}></div>
            <span className={`text-xs ${doctor.isOnline ? 'text-emerald-600' : 'text-gray-500'} ml-1`}>
              {doctor.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
          <p className="text-slate-500 text-sm mb-1">Department</p>
          <p className="font-medium text-slate-800 flex items-center">
            <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
            {doctor.department}
          </p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
          <p className="text-slate-500 text-sm mb-1">Hospital</p>
          <p className="font-medium text-slate-800 flex items-center">
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            {doctor.hospital}
          </p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
          <p className="text-slate-500 text-sm mb-1">Appointments</p>
          <div className="flex justify-between items-center">
            <p className="font-medium text-slate-800">{doctor.appointments}</p>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
          <p className="text-slate-500 text-sm mb-1">Expertise</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {doctor.expertise.map((skill, index) => (
              <span 
                key={index} 
                className={`text-xs ${
                  index % 3 === 0 ? 'bg-cyan-100 text-cyan-600' : 
                  index % 3 === 1 ? 'bg-indigo-100 text-indigo-600' : 
                  'bg-purple-100 text-purple-600'
                } px-2 py-1 rounded-lg`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoCard;
