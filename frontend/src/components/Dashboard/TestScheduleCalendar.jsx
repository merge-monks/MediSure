import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ArrowRight, Plus } from "lucide-react";

const TestScheduleCalendar = ({ testEntries }) => {
  const [selectedDate, setSelectedDate] = useState(7);
  const [currentMonth, setCurrentMonth] = useState("January 2023");
  const [activeTab, setActiveTab] = useState("all");

  // Calendar data
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = [
    [29, 30, 31, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 1, 2],
  ];

  return (
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
            <div
              key={day}
              className="text-center text-xs font-medium text-slate-500"
            >
              {day}
            </div>
          ))}
        </div>

        {dates.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
            {week.map((date, dateIndex) => {
              const isCurrentMonth =
                date > 9 ||
                (weekIndex < 2 && dateIndex > 2) ||
                (weekIndex > 3 && dateIndex < 3);
              const isSelected = date === selectedDate && weekIndex === 1;
              const hasEvents =
                date === 7 || date === 12 || date === 15 || date === 20;

              return (
                <div
                  key={`${weekIndex}-${dateIndex}`}
                  className={`
                    relative text-center py-2 text-sm rounded-lg transition-all duration-200
                    ${
                      isCurrentMonth ? "text-slate-400" : "text-slate-700"
                    }
                    ${
                      isSelected
                        ? "bg-cyan-500 to-blue-500 text-white shadow-sm"
                        : "hover:bg-slate-100 cursor-pointer"
                    }
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
            January 12
          </div>
        </div>

        <div className="space-y-2.5 mt-2">
          {testEntries.map((entry) => (
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
                  {entry.status === "completed"
                    ? "Done"
                    : entry.status === "in-progress"
                    ? "In Progress"
                    : entry.time}
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
      </div>

      <button className="bg-cyan-500 to-blue-500 text-white w-full py-2.5 rounded-xl mt-4 text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center">
        <Plus size={16} className="mr-1" /> Add New Appointment
      </button>
    </div>
  );
};

export default TestScheduleCalendar;
