import React from "react";
import { Filter } from "lucide-react";

const TestDistributionChart = ({ testsData }) => {
  return (
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
              <p className="text-sm font-medium text-slate-600">
                Total Tests
              </p>
              <p className="text-2xl font-bold text-slate-800">428</p>
              <p className="text-xs text-cyan-600">+8% from last month</p>
            </div>
          </div>

          <svg
            viewBox="0 0 100 100"
            className="transform -rotate-90 w-full h-full"
          >
            {testsData.map((test, index) => {
              const prevPercent = testsData
                .slice(0, index)
                .reduce((sum, item) => sum + item.percentage, 0);
              const offset = prevPercent * 3.6; // 3.6 = 360 / 100
              const sweep = test.percentage * 3.6;

              return (
                <circle
                  key={test.name}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={test.color.replace("bg-", "var(--color-")}
                  strokeWidth="20"
                  strokeDasharray={`${sweep} ${360 - sweep}`}
                  strokeDashoffset={-offset}
                  className={test.color.replace("bg-", "text-")}
                />
              );
            })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {testsData.map((test) => (
          <div
            key={test.name}
            className="flex items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-lg ${test.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}
            >
              {test.percentage}%
            </div>
            <div className="ml-2">
              <span className="text-sm font-medium text-slate-700 block">
                {test.name}
              </span>
              <span className="text-xs text-slate-500">
                {Math.round((428 * test.percentage) / 100)} tests
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2.5 text-sm font-medium text-center text-cyan-600 bg-cyan-50 rounded-xl hover:bg-cyan-100 transition-colors">
        View Detailed Report
      </button>
    </div>
  );
};

export default TestDistributionChart;
